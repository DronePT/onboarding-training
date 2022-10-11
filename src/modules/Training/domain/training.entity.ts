import { Training } from '../../../constants/trainings';
import { Entity } from '../../../core';
import { TrainingStepEntity } from './training-step.entity';

interface TrainingState {
  id: string;
  slug: string;
  name: string;
  description: string;
  steps: TrainingStepEntity[];
}

export class TrainingEntity extends Entity<string, TrainingState> {
  get steps(): TrainingStepEntity[] {
    return this.getState().steps;
  }

  get name(): string {
    return this.getState().name;
  }

  get description(): string {
    return this.getState().description;
  }

  get slug(): string {
    return this.getState().slug;
  }

  getStepIndex(stepSlug: string): number {
    return this.steps.findIndex((s) => s.slug === stepSlug);
  }

  getStepSlug(stepIndex: number): string {
    return this.steps[stepIndex].slug;
  }

  getFirstStepSlug(): string {
    return this.steps[0].slug;
  }

  getLastStepSlug(): string {
    return this.steps[this.steps.length - 1].slug;
  }

  getNextStepSlug(stepIndex: number): string {
    return this.steps[stepIndex + 1].slug;
  }

  getTotalSteps(): number {
    return this.steps.length;
  }

  getStepByIndex(index: number): TrainingStepEntity {
    const step = this.steps[index];

    if (!step) {
      return this.steps[this.steps.length - 1];
    }

    return step;
  }

  get totalSteps(): number {
    return this.getTotalSteps();
  }

  toDatabase(): Partial<Training> {
    const { name, slug, description } = this.getState();

    return {
      name,
      slug,
      description,
    };
  }

  static fromStore(state: Training): TrainingEntity {
    return new TrainingEntity({
      ...state,
      id: state.slug,
      steps: state.steps.map((s) => TrainingStepEntity.fromStore(s)),
    });
  }
}
