import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faCheckCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AnimationJsonEnum } from 'src/app/shared/animations/animation-json.enum';
import {
  Answer,
  AnswerViewModel,
  Question,
  QuestionViewModel,
} from '../question.model';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'ml-complete-sentence',
  templateUrl: './complete-sentence.component.html',
  styleUrls: ['./complete-sentence.component.scss'],
  standalone: false,
})
export class CompleteSentenceComponent implements OnInit {
  @Output() progress: EventEmitter<{
    totalQuestions: number;
    answered: number;
  }> = new EventEmitter<{ totalQuestions: number; answered: number }>();
  private checkAnswersAction: Subscription;
  answers: number = 0;
  faCheck = faCheckCircle;
  faExit = faDoorOpen;
  indexCurrentQuestion: number = 0;
  questions: Question[] = [];
  questionViewModel: QuestionViewModel = {
    answers: [],
    statement: '',
    id: '',
    title: '',
    levelId: 0,
    type: { id: '', name: '' },
  };
  selectedAnswers: AnswerViewModel[] = [];
  loading: boolean = true;

  constructor(private questionService: QuestionsService) {
    this.questionService.questionsAction$.subscribe((questions) => {
      if (questions.length > 0) {
        this.questions = questions;
        this.loading = false;
        this.questionViewModel = {
          ...this.questions[0],
          answers: this.mappingAnswers(this.questions[0].answers),
        };
      }
    });
  }

  nextQuestion() {
    this.questionService.enableCheckButton(false);
    if (this.indexCurrentQuestion < this.questions.length - 1) {
      const nextQuestionIndex = this.indexCurrentQuestion + 1;
      this.questionViewModel = {
        ...this.questions[nextQuestionIndex],
        answers: this.mappingAnswers(this.questions[nextQuestionIndex].answers),
      };
      this.indexCurrentQuestion++;
    }
    if (this.answers != this.questions.length) {
      this.answers++;
      this.questionService.changeProgress(this.questions.length, this.answers);
    }
  }

  mappingAnswers(answers: Answer[]): AnswerViewModel[] {
    return answers.map((answer) => ({
      ...answer,
      selected: false,
    }));
  }
  ngOnInit(): void {
    this.checkAnswersAction =
      this.questionService.checkAnswersAction$.subscribe(() => {
        this.checkAnswers(this.selectedAnswers);
      });
  }

  toggleSelection(answerViewModel: AnswerViewModel) {
    const selectedOptions = this.questionViewModel.answers.filter(
      (answerViewModel: AnswerViewModel) => answerViewModel.selected
    );
    const correctAnswers = this.questionViewModel.answers.filter(
      (answerViewModel: AnswerViewModel) => answerViewModel.itsCorrect
    );

    if (answerViewModel.selected) {
      answerViewModel.selected = false;
      this.removeAnswerAtStatement(
        this.questionViewModel.statement,
        answerViewModel.description
      );
      this.removeSelectedAnswer(answerViewModel.id);
    } else if (selectedOptions.length < correctAnswers.length) {
      answerViewModel.selected = true;
      this.replaceStatementWithAnswer(
        this.questionViewModel.statement,
        answerViewModel.description
      );
      this.addSelectedAnswer(answerViewModel);
    }
    if (this.selectedAnswers.length == correctAnswers.length) {
      this.questionService.enableCheckButton(true);
    } else {
      this.questionService.enableCheckButton(false);
    }
  }

  addSelectedAnswer(answerViewModel: AnswerViewModel) {
    this.selectedAnswers.push(answerViewModel);
  }

  removeSelectedAnswer(answerId: string) {
    this.selectedAnswers = this.selectedAnswers.filter(
      (answer: AnswerViewModel) => answer.id != answerId
    );
  }

  cleanSelectedAnswers() {
    this.selectedAnswers = [];
  }

  checkAnswers(selectedAnswers: AnswerViewModel[]) {
    if (this.selectedAnswers.length >= 2) {
      const questionCorrectAnswers = this.questionViewModel.answers.filter(
        (answer: AnswerViewModel) => answer.itsCorrect
      );
      this.checkManyAnswers(questionCorrectAnswers, selectedAnswers);
    } else {
      const isCorrectAnswer = selectedAnswers[0]?.itsCorrect;
      if (isCorrectAnswer) {
        this.questionService.showAnimate(AnimationJsonEnum.CorrectAnswer);
        this.cleanSelectedAnswers();
        this.nextQuestion();
      } else {
        this.questionService.showAnimate(AnimationJsonEnum.IncorrectAnswer);
      }
    }
  }

  checkManyAnswers(
    correctAnswers: AnswerViewModel[],
    selectedAnswers: AnswerViewModel[]
  ) {
    const correctAnswersOrdered = this.orderAnswersByPosition(correctAnswers);
    selectedAnswers = this.orderAnswersByPosition(selectedAnswers);
    
    const isCorrectAnswers =
      JSON.stringify(correctAnswersOrdered) === JSON.stringify(selectedAnswers);
    if (isCorrectAnswers) {
      this.questionService.showAnimate(AnimationJsonEnum.CorrectAnswer);
      this.cleanSelectedAnswers();
      this.nextQuestion();
    } else {
      this.questionService.showAnimate(AnimationJsonEnum.IncorrectAnswer);
    }
  }

  private orderAnswersByPosition(
    answers: AnswerViewModel[]
  ): AnswerViewModel[] {
    return answers.sort((a, b) => a.position - b.position);
  }

  replaceStatementWithAnswer(statement: string, answer: string) {
    let statementReplace = statement.replace('{*}', answer);
    this.questionViewModel.statement = statementReplace;
  }

  removeAnswerAtStatement(statement: string, answer: string) {
    let statementReplace = statement.replace(answer, '{*}');
    this.questionViewModel.statement = statementReplace;
  }

  ngOnDestroy(): void {
    if (this.checkAnswersAction) {
      this.checkAnswersAction.unsubscribe();
      this.questionService.setQuestionsState([]);
    }
  }
}
