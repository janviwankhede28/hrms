 import { appConfig } from './app/app.config';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes) ,// ✅ Router yahan se provide ho raha hai
     importProvidersFrom(FormsModule, HttpClientModule)
  ]
});




