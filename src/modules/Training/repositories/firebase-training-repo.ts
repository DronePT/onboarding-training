import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  collection,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { Step } from '../../../constants/trainings';
import {
  TrainingEntity,
  TrainingsRepoTrainingRepo,
  TrainingStepEntity,
} from '../domain';

function mapSeries<T, U>(arr: T[], fn: (item: T) => Promise<U>): Promise<U[]> {
  return arr.reduce(
    (promise, item) =>
      promise.then((result) => fn(item).then((item) => [...result, item])),
    Promise.resolve([] as U[])
  );
}

export class FirebaseTrainingsRepoTrainingRepo extends TrainingsRepoTrainingRepo {
  private static _instance: FirebaseTrainingsRepoTrainingRepo;

  private _app!: FirebaseApp;
  private _db!: Firestore;

  constructor() {
    super();

    if (FirebaseTrainingsRepoTrainingRepo._instance) {
      return FirebaseTrainingsRepoTrainingRepo._instance;
    }

    this._app = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    });

    this._db = getFirestore(this._app);
  }

  async getTrainingBySlug(slug: string): Promise<TrainingEntity> {
    const trainingsCollection = collection(this._db, 'trainings');
    const q = query(trainingsCollection, where('slug', '==', slug));
    const trainingsSnapshot = await getDocs(q);

    if (trainingsSnapshot.empty) {
      throw new Error('No matching documents.');
    }

    const training = trainingsSnapshot.docs[0].data();

    const steps = await mapSeries(training.steps, this._getStep);

    const trainingEntity = TrainingEntity.fromStore({
      name: training.name,
      description: training.description,
      slug: training.slug,
      steps,
    });

    return trainingEntity;
  }

  private async _getStep(stepRef: any): Promise<Step> {
    const step = await getDoc(stepRef);
    const stepData = step.data() as Step;

    stepData.content = stepData.content.replaceAll('\\n', '\n');

    return stepData;
  }

  async addTraining(training: TrainingEntity) {
    return;
  }

  private _addStep(trainingId: string, step: TrainingStepEntity): any {}

  public static getInstance(): FirebaseTrainingsRepoTrainingRepo {
    return new FirebaseTrainingsRepoTrainingRepo();
  }

  public static get instance(): FirebaseTrainingsRepoTrainingRepo {
    return FirebaseTrainingsRepoTrainingRepo.getInstance();
  }
}
