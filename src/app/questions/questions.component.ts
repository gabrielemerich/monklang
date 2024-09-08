import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Question, QuestionType } from './question.model';
import { QuestionsService } from './questions.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ml-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  @Input() progressBarPercent: string = '5%';

  faCheck = faCheckCircle;
  faExit = faDoorOpen;

  questions: Question[] = [];
  types: QuestionType[] = [];
  randomType: QuestionType | undefined;

  constructor(
    private questionsService: QuestionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionsService
      .getTypes()
      .pipe(
        switchMap((types: QuestionType[]) => {
          this.types = types;
          this.randomType = this.getRandomType(types);
          return this.randomType
            ? this.questionsService.getByTypeId(this.randomType.id)
            : of([]);
        })
      )
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        if (this.randomType) {
          this.router.navigate([`/questions/${this.randomType.name}`], {
            state: this.questions,
          });
        }
      });

    this.questionsService.changeProgressAction$.subscribe(
      ([totalQuestions, answered]) => {
        if (totalQuestions && answered)
          this.changeProgress(totalQuestions, answered);
      }
    );
  }

  changeProgress(totalQuestions: number, answered: number) {
    let progress = (answered / totalQuestions) * 100;
    console.log(progress);
    this.progressBarPercent = `${progress.toPrecision(1)}%`;
  }

  checkAnswers() {
    this.questionsService.checkAnswers();
  }

  private getRandomType(types: QuestionType[]): QuestionType | undefined {
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }
}
