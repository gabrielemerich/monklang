import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Question, QuestionType } from './question.model';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'ml-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  @Input() progressBarPercent: string = '0%';

  faCheck = faCheckCircle;
  faExit = faDoorOpen;
  loading: boolean = true;
  showAnimate = false;
  checkButtonEnabled: boolean = false;
  questions: Question[] = [];
  types: QuestionType[] = [];
  randomType: QuestionType | undefined;
  private animationItem: AnimationItem;

  constructor(
    private questionsService: QuestionsService,
    private router: Router
  ) {}

  options: AnimationOptions = {
    path: '/assets/animations/correctAnswerAnimate.json',
  };

  styles: Partial<CSSStyleDeclaration> = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnInit(): void {
    this.router.navigate([`/questions/complete-sentence`]).then(() => {
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
            this.questionsService.setQuestionsState(questions);
            this.loading = false;
            this.progressBarPercent = '5%';
          }
        });
    });

    this.questionsService.changeProgressAction$.subscribe(
      ([totalQuestions, answered]) => {
        if (totalQuestions && answered)
          this.changeProgress(totalQuestions, answered);
      }
    );

    this.questionsService.enabledCheckButtonAction$.subscribe(
      (enable: boolean) => {
        this.checkButtonEnabled = enable;
      }
    );

    this.questionsService.animateSubjectAction$.subscribe(() => {
      this.showAnimate = true;
      setTimeout(() => {
        this.showAnimate = false;
      }, 1000);
    });
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
