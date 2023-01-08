import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { CompleteSentenceComponent } from './questions/complete-sentence/complete-sentence.component';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  {
    path: 'questions',
    loadChildren: () =>
      import('./questions/questions.module').then(
        (module) => module.QuestionsModule
      ),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
