import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatsComponent } from './componenti/stats/stats.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { MappaComponent } from './componenti/mappa/mappa.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UploadatComponent } from './componenti/uploadat/uploadat.component';
import { AgmCoreModule } from '@agm/core';
import {MatDialogModule} from '@angular/material/dialog';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminComponent } from './componenti/form/form.admin.component';
import { FormdatComponent } from './componenti/form/form.component';





@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    DashboardComponent,
    MappaComponent,
    UploadatComponent,
    AdminComponent,
    FormdatComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFZPxTAQfa8DZt1LdOibDLhI3jfTgJFr4'
    }),
    MatDialogModule,
    CdkTreeModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
