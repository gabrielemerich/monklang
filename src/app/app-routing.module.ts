import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { CompleteSentenceComponent } from './questions/complete-sentence/complete-sentence.component';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: CompleteSentenceComponent, path: 'complete-sentence' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
