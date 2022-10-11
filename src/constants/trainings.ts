export interface Step {
  slug: string;
  name: string;
  content: string;
}

export interface Training {
  slug: string;
  name: string;
  description: string;
  steps: Step[];
}
