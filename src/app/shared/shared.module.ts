import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLevelComponent } from './card-level/card-level.component';



@NgModule({
  declarations: [
    CardLevelComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CardLevelComponent,
  ]
})
export class SharedModule { }
