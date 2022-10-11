import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '../../../store';
import {
  TrainingEntity,
  TrainingProgressValueObject,
  TrainingStepEntity,
} from '../domain';
import { TrainingService } from '../services';

interface UseTrainingReturn {
  training?: TrainingEntity;
  isLoading: boolean;
  currentStep?: TrainingStepEntity;
  progress: TrainingProgressValueObject;
  nextStep?: () => void;
  previousStep?: () => void;
  goToStep?: (stepSlug: string) => void;
  resetTraining?: () => void;
}

export const useTraining = (
  trainingSlug: string,
  stepSlug: string
): UseTrainingReturn => {
  const [trainingProgress, setTrainingProgress] = useStore((state) => [
    state.trainingProgress,
    state.setTrainingProgress,
  ]);

  const navigate = useNavigate();

  const { data: training, isLoading } = useQuery(
    ['training', trainingSlug],
    () => TrainingService.getTraining(trainingSlug),
    {
      onSuccess: (training) => {
        if (!trainingProgress[training.slug]) {
          setTrainingProgress(
            training.slug,
            TrainingProgressValueObject.default()
          );
        }
      },
    }
  );

  const progress =
    trainingProgress[trainingSlug] || TrainingProgressValueObject.default();

  const viewingStepIndex = useMemo(
    () => training?.getStepIndex(stepSlug) ?? -1,
    [training, stepSlug]
  );

  useEffect(() => {
    if (!viewingStepIndex) return;

    if (viewingStepIndex > progress.currentStep) {
      navigate(
        `/training/${trainingSlug}/${training?.getStepSlug(
          progress.currentStep
        )}`
      );
    }
  }, [
    trainingSlug,
    viewingStepIndex,
    progress.currentStep,
    training,
    navigate,
  ]);

  const resetTraining = () => {
    if (!training) return;

    setTrainingProgress(trainingSlug, TrainingProgressValueObject.default());
    navigate(`/training/${trainingSlug}/${training.getFirstStepSlug()}`);
  };

  const nextStep = () => {
    if (!training) return;

    const completed = progress.currentStep >= training.totalSteps - 1;

    setTrainingProgress(
      trainingSlug,
      progress.copyWith({
        currentStep: progress.currentStep + 1,
        completed,
      })
    );

    if (completed) return;

    navigate(
      `/training/${trainingSlug}/${training.getNextStepSlug(
        progress.currentStep
      )}`
    );
  };

  return {
    isLoading,
    training,
    progress,
    currentStep: training?.getStepByIndex(viewingStepIndex),
    nextStep,
    resetTraining,
  };
};
