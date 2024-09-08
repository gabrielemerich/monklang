export interface Question {
  statement: string;
  title: string;
  levelId: number;
  answers: Answer[];
  type: QuestionType;
}

export interface QuestionViewModel extends Question {
  answers: AnswerViewModel[];
}

export interface Answer {
  itsCorrect: boolean;
  description: string;
}

export interface AnswerViewModel extends Answer {
  selected: boolean;
}

export interface QuestionType {
  id: string;
  name: string;
}
