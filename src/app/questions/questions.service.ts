import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { configApiUrl } from '../config/api.config';
import { Question, QuestionType } from './question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  private checkAnswersSubject = new Subject();
  private animateSubject = new Subject();
  private changeProgressSubject = new BehaviorSubject<[number, number]>([0, 0]);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  animateSubjectAction$ = this.animateSubject.asObservable();
  checkAnswersAction$ = this.checkAnswersSubject.asObservable();
  questionsAction$ = this.questionsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  changeProgressAction$: Observable<[number, number]> =
    this.changeProgressSubject.asObservable();

  getByTypeId(typeId: string) {
    return this.http.get<Question[]>(
      `${configApiUrl}questions/Types/${typeId}`
    );
  }

  getTypes() {
    return this.http
      .get<QuestionType[]>(`${configApiUrl}questions/types`)
      .pipe(delay(2000));
  }

  checkAnswers() {
    this.checkAnswersSubject.next();
  }

  hideLoading() {
    this.loadingSubject.next(false);
  }

  changeProgress(totalQuestions: number, answered: number) {
    this.changeProgressSubject.next([totalQuestions, answered]);
  }

  setQuestionsState(questions: Question[]) {
    this.questionsSubject.next(questions);
  }

  showAnimate() {
    this.animateSubject.next();
  }
}
