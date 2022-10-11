import { ValueObject } from '../../../core';

export interface TrainingProgressState {
  currentStep: number;
  completed: boolean;

  // This is the only property that is not required
  // because it is only used for the last step
  // of the training
  completedAt?: string;
}

export class TrainingProgressValueObject extends ValueObject<TrainingProgressState> {
  get currentStep(): number {
    return this.getState().currentStep;
  }

  get completed(): boolean {
    return this.getState().completed;
  }

  get completedAt(): string | undefined {
    return this.getState().completedAt;
  }

  toJSON(): TrainingProgressState {
    return this.getState();
  }

  copyWith(
    values: Partial<TrainingProgressState>
  ): TrainingProgressValueObject {
    return new TrainingProgressValueObject({
      ...this.getState(),
      ...values,
    });
  }

  static default(): TrainingProgressValueObject {
    return new TrainingProgressValueObject({
      currentStep: 0,
      completed: false,
    });
  }
}
