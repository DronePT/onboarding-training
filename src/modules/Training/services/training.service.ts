import { FirebaseTrainingsRepoTrainingRepo } from '../repositories';

export class TrainingService {
  static getTraining(trainingSlug: string) {
    return FirebaseTrainingsRepoTrainingRepo.instance.getTrainingBySlug(
      trainingSlug
    );
  }
}
