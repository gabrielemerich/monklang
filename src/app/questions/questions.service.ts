import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question, QuestionType } from './question.model';
import { configApiUrl } from '../config/api.config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  private actionSubject = new Subject<void>();
  checkAnswersAction$ = this.actionSubject.asObservable();

  getByTypeId(typeId: string) {
    return this.http.get<Question[]>(
      `${configApiUrl}questions/Types/${typeId}`
    );
  }

  getTypes() {
    return this.http.get<QuestionType[]>(`${configApiUrl}questions/types`);
  }

  checkAnswers() {
    this.actionSubject.next();
  }
}
