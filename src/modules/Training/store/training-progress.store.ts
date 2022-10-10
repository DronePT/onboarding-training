interface TrainingProgress {
  currentStep: number;
  completed: boolean;

  // This is the only property that is not required
  // because it is only used for the last step
  // of the training
  completedAt?: string;
}

interface TrainingProgressMap {
  [key: string]: TrainingProgress;
}

interface TrainingProgressSlice {
  trainingProgress: TrainingProgressMap;
  setTrainingProgress: (training: string, progress: TrainingProgress) => void;
}

const LOCAL_STORAGE_KEY = 'trainingProgress';

const defaultTrainingProgress: TrainingProgressMap = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
);

export const createTrainingProgressSlice = (
  set: any,
  get: any
): TrainingProgressSlice => {
  return {
    trainingProgress: defaultTrainingProgress,
    setTrainingProgress: (training: string, progress: TrainingProgress) =>
      set((state: TrainingProgressSlice) => {
        const trainingProgress = {
          ...state.trainingProgress,
          [training]: progress,
        };

        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(trainingProgress)
        );

        return { trainingProgress };
      }),
  };
};
