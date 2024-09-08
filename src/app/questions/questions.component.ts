import { Component, OnInit } from '@angular/core';
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
  }

  checkAnswers() {
    this.questionsService.checkAnswers();
  }

  replaceStatementWithAnswer(statement: string, answer: string) {
    statement.replace('?', answer);
  }

  private getRandomType(types: QuestionType[]): QuestionType | undefined {
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }
}
