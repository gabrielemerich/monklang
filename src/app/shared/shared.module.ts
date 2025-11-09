import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardLevelComponent } from './card-level/card-level.component';
import { FooterQuestionComponent } from './footer-question/footer-question.component';
import { HeaderQuestionComponent } from './header-question/header-question.component';

@NgModule({
  declarations: [
    CardLevelComponent,
    HeaderQuestionComponent,
    FooterQuestionComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    CardLevelComponent,
    FontAwesomeModule,
    HeaderQuestionComponent,
  ],
})
export class SharedModule {}
