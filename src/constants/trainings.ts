import advanced from './advanced';
import firstSteps from './first-steps';

export interface Step {
  slug: string;
  name: string;
  content: string;
}

interface Training {
  slug: string;
  name: string;
  description: string;
  steps: Step[];
}

export const TRAININGS: Training[] = [
  {
    slug: 'first-steps',
    name: 'First Steps',
    description: 'Learn the basics of React',
    steps: firstSteps,
  },
  {
    slug: 'advanced',
    name: 'Advanced',
    description: 'Learn advanced React concepts',
    steps: advanced,
  },
];
