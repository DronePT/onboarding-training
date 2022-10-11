import { AppWriteTrainingsRepoTrainingRepo } from '../repositories/appwrite-training-repo';

export class TrainingService {
  static getTraining(trainingSlug: string) {
    return AppWriteTrainingsRepoTrainingRepo.instance.getTrainingBySlug(
      trainingSlug
    );
  }
}
