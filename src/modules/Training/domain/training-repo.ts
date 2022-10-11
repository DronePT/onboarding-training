import { TrainingEntity } from './training.entity';

export abstract class TrainingsRepoTrainingRepo {
  abstract getTrainingBySlug(slug: string): Promise<TrainingEntity>;

  abstract addTraining(training: TrainingEntity): Promise<void>;
}
