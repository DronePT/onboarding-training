export interface Step {
  slug: string;
  name: string;
  content: string;
  position: number;
}

export interface Training {
  slug: string;
  name: string;
  description: string;
  steps: Step[];
}
