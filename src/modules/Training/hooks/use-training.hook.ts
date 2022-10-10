import { TRAININGS } from '../../../constants/trainings';

export const useTraining = (slug?: string) => {
  const training = TRAININGS.find((training) => training.slug === slug);

  if (!training) return null;

  return training;
};
