import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { provideLottieOptions } from 'ngx-lottie';

@NgModule({
    declarations: [AppComponent, HomeComponent, CategoriesComponent],
    bootstrap: [AppComponent], 
    imports: [BrowserModule, AppRoutingModule, SharedModule], 
    providers: 
    [
        provideHttpClient(withInterceptorsFromDi()),
         provideLottieOptions({
      player: () => import('lottie-web'),
    })
    ]
})
export class AppModule { }
