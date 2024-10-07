import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import player from 'lottie-web';
import { LottieComponent, LottieModule } from 'ngx-lottie';
import { CardLevelComponent } from './card-level/card-level.component';
import { FooterQuestionComponent } from './footer-question/footer-question.component';
import { HeaderQuestionComponent } from './header-question/header-question.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    CardLevelComponent,
    HeaderQuestionComponent,
    FooterQuestionComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    CardLevelComponent,
    FontAwesomeModule,
    HeaderQuestionComponent,
    LottieComponent,
  ],
})
export class SharedModule {}
