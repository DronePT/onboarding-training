import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TRAININGS } from '../../../constants/trainings';

import { useStore } from '../../../store';

export const useTraining = (trainingSlug: string, stepSlug: string) => {
  const [trainingProgress, setTrainingProgress] = useStore((state) => [
    state.trainingProgress,
    state.setTrainingProgress,
  ]);

  const navigate = useNavigate();

  const training = TRAININGS.find((t) => t.slug === trainingSlug);

  if (!training)
    return {
      steps: [],
      currentStep: 0,
      content: '',
    };

  const { steps, name } = training;

  const progress = trainingProgress[trainingSlug] || {
    currentStep: 0,
    completed: false,
  };

  const viewingStepIndex = useMemo(
    () => steps.findIndex((s) => s.slug === stepSlug),
    [steps, stepSlug]
  );

  useEffect(() => {
    if (viewingStepIndex > progress.currentStep) {
      navigate(`/training/${trainingSlug}/${steps[progress.currentStep].slug}`);
    }
  }, [trainingSlug, viewingStepIndex, progress.currentStep, steps, navigate]);

  const resetTraining = () => {
    setTrainingProgress(trainingSlug, {
      currentStep: 0,
      completed: false,
    });

    navigate(`/training/${trainingSlug}/${steps[0].slug}`);
  };

  const nextStep = () => {
    const completed = progress.currentStep >= steps.length - 1;

    setTrainingProgress(trainingSlug, {
      ...progress,
      currentStep: progress.currentStep + 1,
      completed,
    });

    if (completed) return;

    navigate(
      `/training/${trainingSlug}/${steps[progress.currentStep + 1].slug}`
    );
  };

  return {
    steps,
    name,
    content: steps[viewingStepIndex].content,
    stepName: steps[viewingStepIndex].name,
    totalSteps: steps.length,
    currentStep: progress.currentStep,
    viewingStepIndex,
    completed: progress.completed,
    nextStep,
    resetTraining,
  };
};
