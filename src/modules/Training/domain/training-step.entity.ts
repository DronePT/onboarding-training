import { Step } from '../../../constants/trainings';
import { Entity } from '../../../core';

interface TrainingStepState {
  id: string;
  slug: string;
  name: string;
  content: string;
}

export class TrainingStepEntity extends Entity<string, TrainingStepState> {
  get content(): string {
    return this.getState().content;
  }

  get name(): string {
    return this.getState().name;
  }

  get slug(): string {
    return this.getState().slug;
  }

  toDatabase(): Partial<Step> {
    const { name, slug, content } = this.getState();

    return {
      name,
      slug,
      content,
    };
  }

  static fromStore(state: Step): TrainingStepEntity {
    return new TrainingStepEntity({
      ...state,
      id: state.slug,
    });
  }
}
