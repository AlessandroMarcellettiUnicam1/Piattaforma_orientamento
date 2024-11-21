
// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { FormdatComponent } from './form.component';

@NgModule({
  declarations: [
    FormdatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [FormdatComponent]
})
export class AppModule { }