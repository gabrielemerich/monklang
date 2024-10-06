export interface Question {
  statement: string;
  title: string;
  levelId: number;
  answers: Answer[];
  type: QuestionType;
  id: string;
}

export interface QuestionViewModel extends Question {
  answers: AnswerViewModel[];
}

export interface Answer {
  itsCorrect: boolean;
  description: string;
  position: number;
  id: string;
}

export interface AnswerViewModel extends Answer {
  selected: boolean;
  questionId?: string;
}

export interface QuestionType {
  id: string;
  name: string;
}
