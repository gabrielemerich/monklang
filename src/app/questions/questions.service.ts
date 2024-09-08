import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question, QuestionType } from './question.model';
import { configApiUrl } from '../config/api.config';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  private checkAnswersSubject = new Subject<void>();
  private changeProgressSubject = new BehaviorSubject<[number, number]>([0, 0]);

  checkAnswersAction$ = this.checkAnswersSubject.asObservable();
  changeProgressAction$: Observable<[number, number]> =
    this.changeProgressSubject.asObservable();

  getByTypeId(typeId: string) {
    return this.http.get<Question[]>(
      `${configApiUrl}questions/Types/${typeId}`
    );
  }

  getTypes() {
    return this.http.get<QuestionType[]>(`${configApiUrl}questions/types`);
  }

  checkAnswers() {
    this.checkAnswersSubject.next();
  }

  changeProgress(totalQuestions: number, answered: number) {
    this.changeProgressSubject.next([totalQuestions, answered]);
  }
}
