import { TrainingProgressState, TrainingProgressValueObject } from '../domain';

interface TrainingProgress {
  currentStep: number;
  completed: boolean;

  // This is the only property that is not required
  // because it is only used for the last step
  // of the training
  completedAt?: string;
}

type TrainingName = string;

interface LocalTrainingProgressMap {
  [key: TrainingName]: TrainingProgressState;
}

interface TrainingProgressMap {
  [key: TrainingName]: TrainingProgressValueObject;
}

interface TrainingProgressSlice {
  trainingProgress: TrainingProgressMap;
  setTrainingProgress: (
    training: string,
    progress: TrainingProgressValueObject
  ) => void;
}

const LOCAL_STORAGE_KEY = 'trainingProgress';

const getDefaultTrainingProgress = (): TrainingProgressMap => {
  const localProgress = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!localProgress) return {};

  const progress = JSON.parse(localProgress) as LocalTrainingProgressMap;

  return Object.keys(progress).reduce((acc, trainingName) => {
    const trainingProgress: TrainingProgressState = progress[trainingName];

    return {
      ...acc,
      [trainingName]: new TrainingProgressValueObject(trainingProgress),
    };
  }, {});
};

const saveLocalStorage = (trainingProgress: TrainingProgressMap) => {
  const localProgress = Object.keys(trainingProgress).reduce(
    (acc, trainingName) => {
      const progress = trainingProgress[trainingName];

      return {
        ...acc,
        [trainingName]: progress.toJSON(),
      };
    },
    {} as LocalTrainingProgressMap
  );

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localProgress));
};

export const createTrainingProgressSlice = (
  set: any,
  get: any
): TrainingProgressSlice => {
  return {
    trainingProgress: getDefaultTrainingProgress(),
    setTrainingProgress: (
      training: string,
      progress: TrainingProgressValueObject
    ) =>
      set((state: TrainingProgressSlice) => {
        const trainingProgress = {
          ...state.trainingProgress,
          [training]: progress,
        };

        saveLocalStorage(trainingProgress);

        return { trainingProgress };
      }),
  };
};
