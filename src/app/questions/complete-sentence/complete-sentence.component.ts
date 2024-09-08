import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { QuestionsService } from '../questions.service';
import { Subscription } from 'rxjs';
import {
  Answer,
  AnswerViewModel,
  Question,
  QuestionViewModel,
} from '../question.model';

@Component({
  selector: 'ml-complete-sentence',
  templateUrl: './complete-sentence.component.html',
  styleUrls: ['./complete-sentence.component.scss'],
})
export class CompleteSentenceComponent implements OnInit {
  faCheck = faCheckCircle;
  faExit = faDoorOpen;
  indexCurrentQuestion: number = 0;
  questions: Question[] = [];
  questionViewModel: QuestionViewModel;
  selectedAnswers = [];
  private checkAnswersAction: Subscription;

  constructor(
    private activatedRouter: Router,
    private questionService: QuestionsService
  ) {
    this.questions = this.activatedRouter.getCurrentNavigation()?.extras
      .state as Question[];

    this.questionViewModel = {
      ...this.questions[0],
      answers: this.mappingAnswers(this.questions[0].answers),
    };

    console.log(this.questionViewModel);
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
        this.nextQuestion();
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
    } else if (selectedOptions.length < correctAnswers.length) {
      answerViewModel.selected = true;
      this.replaceStatementWithAnswer(
        this.questionViewModel.statement,
        answerViewModel.description
      );
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
