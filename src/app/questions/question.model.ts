export interface Question {
  statement: string;
  title: string;
  levelId: number;
  answers: Answers[];
  type: QuestionType;
}

export interface QuestionViewModel extends Question {
  answers: AnswerViewModel[];
}

export interface Answers {
  itsCorrect: boolean;
  description: string;
}

export interface AnswerViewModel extends Answers {
  selected: boolean;
}

export interface QuestionType {
  id: string;
  name: string;
}
