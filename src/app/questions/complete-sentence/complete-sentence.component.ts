import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { QuestionsService } from '../questions.service';
import { Subscription } from 'rxjs';
import {
  AnswerViewModel,
  Answers,
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

  mappingAnswers(answers: Answers[]): AnswerViewModel[] {
    return answers.map((answer) => ({
      ...answer,
      selected: false,
    }));
  }
  ngOnInit(): void {
    this.checkAnswersAction =
      this.questionService.checkAnswersAction$.subscribe(() => {
        console.log('check answers');
      });
  }

  toggleSelection(answerViewModel: AnswerViewModel) {
    const selectedOptions = this.questionViewModel.answers.filter(
      (answerViewModel: AnswerViewModel) => answerViewModel.selected
    );
    if (answerViewModel.selected) {
      answerViewModel.selected = false;
    } else if (selectedOptions.length < 2) {
      answerViewModel.selected = true;
    }
  }

  ngOnDestroy(): void {
    if (this.checkAnswersAction) {
      this.checkAnswersAction.unsubscribe();
    }
  }
}
