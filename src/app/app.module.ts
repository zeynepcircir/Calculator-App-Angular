import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorAppComponent } from './calculator-app/calculator-app.component';
import { ImageButtonComponent } from './image-button/image-button.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorAppComponent,
    ImageButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
