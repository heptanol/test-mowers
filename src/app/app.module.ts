import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { MatButtonModule, MatGridListModule } from '@angular/material';

import { AppComponent }         from './app.component';
import { LawnComponent } from './lawn/lawn.component';
import { MowerComponent } from './mower/mower.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatGridListModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent,
    LawnComponent,
    MowerComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
