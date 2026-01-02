
export enum CategoryType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  EMAIL_SIMULATION = 'EMAIL_SIMULATION'
}

export interface Choice {
  id: string;
  text: string;
}

export interface EmailData {
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  signature: string;
  disclaimer: string;
  hoverLink?: string;
  displayLink?: string;
  attachment?: {
    name: string;
    type: string;
  };
}

export interface Assessment {
  id: number;
  category: CategoryType;
  question: string;
  choices?: Choice[];
  correctAnswer: string | boolean;
  explanation: string;
  emailData?: EmailData;
  reportingAction?: string;
}

export interface SimulationState {
  currentStep: number;
  score: number;
  view: 'landing' | 'assessment' | 'validation' | 'results';
  lastAnswerCorrect: boolean;
  startTime: number;
  endTime: number;
  userAnswers: any[];
}
