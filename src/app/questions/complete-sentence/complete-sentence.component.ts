import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faCheckCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
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
    if (this.indexCurrentQuestion < this.questions.length - 1) {
      this.questionViewModel = {
        ...this.questions[this.indexCurrentQuestion + 1],
        answers: this.mappingAnswers(
          this.questions[this.indexCurrentQuestion + 1].answers
        ),
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
        console.log('chamo uaqui');
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
        this.cleanSelectedAnswers();
        this.nextQuestion();
      } else {
        console.log('errou');
      }
    }
  }

  checkManyAnswers(
    correctAnswers: AnswerViewModel[],
    selectedAnswers: AnswerViewModel[]
  ) {
    const correctAnswersOrdered = correctAnswers.sort(
      (a, b) => a.position - b.position
    );
    const isCorrectAnswers =
      JSON.stringify(correctAnswersOrdered) === JSON.stringify(selectedAnswers);
    if (isCorrectAnswers) {
      this.cleanSelectedAnswers();
      this.nextQuestion();
      console.log('acertou as 2');
    } else {
      console.log('errou as duas');
    }
  }

  replaceStatementWithAnswer(statement: string, answer: string) {
    let statementReplace = statement.replace('?', answer);
    this.questionViewModel.statement = statementReplace;
  }

  removeAnswerAtStatement(statement: string, answer: string) {
    let statementReplace = statement.replace(answer, '?');
    this.questionViewModel.statement = statementReplace;
  }

  ngOnDestroy(): void {
    if (this.checkAnswersAction) {
      this.checkAnswersAction.unsubscribe();
    }
  }
}
