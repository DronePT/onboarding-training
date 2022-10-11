import { Query } from 'appwrite';
import { Step, Training } from '../../../constants/trainings';
import { AppWriteClient } from '../../../utils';
import { TrainingStepEntity } from './training-step.entity';
import { TrainingEntity } from './training.entity';

export class TrainingsRepoTrainingRepo {
  private static _instance: TrainingsRepoTrainingRepo;

  private _client!: AppWriteClient;

  constructor() {
    if (TrainingsRepoTrainingRepo._instance) {
      return TrainingsRepoTrainingRepo._instance;
    }

    this._client = AppWriteClient.instance;
  }

  async getTrainingBySlug(slug: string): Promise<TrainingEntity> {
    const { documents } = await this._client.databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TRAININGS_COLLECTION_ID,
      [Query.equal('slug', slug)]
    );

    if (documents.length === 0) {
      throw new Error('Training not found');
    }

    const { $id, ...training } = documents[0];

    const { documents: steps } = await this._client.databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TRAININGS_STEPS_COLLECTION_ID,
      [Query.equal('trainingId', $id)]
    );

    return TrainingEntity.fromStore({
      ...(training as unknown as Training),
      steps: steps.sort((a, b) => a.position - b.position) as unknown as Step[],
    });
  }

  async addTraining(training: TrainingEntity) {
    const doc = await this._client.databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TRAININGS_COLLECTION_ID,
      'unique()',
      training.toDatabase()
    );

    const stepsDocs = await Promise.all(
      training.steps.map((s) => this._addStep(doc.$id, s))
    );

    await this._client.databases.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TRAININGS_COLLECTION_ID,
      doc.$id,
      {
        steps: stepsDocs.map((s) => s.$id),
      }
    );
  }

  private _addStep(trainingId: string, step: TrainingStepEntity): any {
    const data = {
      ...step.toDatabase(),
      trainingId,
    };

    return this._client.databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_TRAININGS_STEPS_COLLECTION_ID,
      'unique()',
      data
    );
  }

  public static getInstance(): TrainingsRepoTrainingRepo {
    return new TrainingsRepoTrainingRepo();
  }

  public static get instance(): TrainingsRepoTrainingRepo {
    return TrainingsRepoTrainingRepo.getInstance();
  }
}
