import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteSentenceComponent } from './complete-sentence/complete-sentence.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CompleteSentenceComponent],
  imports: [CommonModule, SharedModule],
})
export class QuestionsModule {}
