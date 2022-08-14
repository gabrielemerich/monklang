import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLevelComponent } from './card-level/card-level.component';
import { HeaderQuestionComponent } from './header-question/header-question.component';
import { FooterQuestionComponent } from './footer-question/footer-question.component';

import { QuestionsModule } from '../questions/questions.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CardLevelComponent,
    HeaderQuestionComponent,
    FooterQuestionComponent,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [CardLevelComponent, FontAwesomeModule, HeaderQuestionComponent],
})
export class SharedModule {}
