import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question, QuestionType } from './question.model';
import { configApiUrl } from '../config/api.config';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  private checkAnswersSubject = new Subject<void>();
  private changeProgressSubject = new BehaviorSubject<[number, number]>([0, 0]);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private questionsSubject = new BehaviorSubject<Question[]>([]);
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
}
