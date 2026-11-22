export type LatihanSubTab = 'skenario' | 'flashcard' | 'kuis';

export interface ScenarioOption {
  id: string;
  text: string;
  isBestPractice: boolean;
  consequence: string;
  feedback: string;
  scientificReason: string;
}

export interface ScenarioItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  patientProfile: {
    name: string;
    age: string;
    condition: string;
  };
  story: string;
  question: string;
  options: ScenarioOption[];
  redFlags: string[];
  referenceCitation: string;
}

export interface FlashcardItem {
  id: string;
  category: 'logo' | 'titik-kritis' | 'dagusibu';
  categoryLabel: string;
  title: string;
  frontPrompt: string;
  frontHint?: string;
  backDefinition: string;
  backRules: string[];
  warningNote?: string;
  referenceSource: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  competency: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  referenceSource: string;
}

export type QuizMode = 'pretest' | 'posttest';

export interface QuizResultState {
  mode: QuizMode;
  score: number;
  totalQuestions: number;
  userAnswers: Record<number, number>;
  completedAt: string;
}
