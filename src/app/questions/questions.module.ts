import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteSentenceComponent } from './complete-sentence/complete-sentence.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions.component';

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
  declarations: [CompleteSentenceComponent, QuestionsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class QuestionsModule {}
