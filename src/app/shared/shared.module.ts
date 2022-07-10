import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLevelComponent } from './card-level/card-level.component';
import { HeaderQuestionComponent } from './header-question/header-question.component';
import { FooterQuestionComponent } from './footer-question/footer-question.component';



@NgModule({
  declarations: [
    CardLevelComponent,
    HeaderQuestionComponent,
    FooterQuestionComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CardLevelComponent,
  ]
})
export class SharedModule { }
