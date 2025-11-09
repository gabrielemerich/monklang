import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteSentenceComponent } from './complete-sentence/complete-sentence.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { HighlightAnswerPipe, HighlightCurlyWordsPipe, HighlightSelectedWordsPipe } from '../shared/pipes/highlight-answers.pipe';
import { LottieComponent } from 'ngx-lottie';

const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent,
    children: [
      { path: 'complete-sentence', component: CompleteSentenceComponent },
    ],
  },
];
@NgModule({
  declarations: [
    CompleteSentenceComponent,
    QuestionsComponent,
    HighlightAnswerPipe,
    HighlightCurlyWordsPipe,
    HighlightSelectedWordsPipe
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), LottieComponent],
})
export class QuestionsModule {}
