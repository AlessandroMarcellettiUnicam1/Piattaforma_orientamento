import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { StatsComponent } from './componenti/stats/stats.component';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { MappaComponent } from './componenti/mappa/mappa.component';
import { UploadatComponent } from './componenti/uploadat/uploadat.component';
import { FormdatComponent } from './componenti/form/form.component';
import { AdminComponent } from './componenti/admin/form.admin.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '' , component: HomeComponent },
    { path: 'stats' , component: StatsComponent },
    { path: 'map' , component: MappaComponent },
    { path: 'upload' , component : UploadatComponent},
    { path: 'form' , component : FormdatComponent},
    { path: 'admin', component: AdminComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export class SharedModule { }