import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../app/list/list.component';
import { ProjectsComponent } from '../app/projects/projects.component'

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: 'list' , component: ListComponent },
  { path: 'projects' , component: ProjectsComponent },
  { path: '**', redirectTo:'/list',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
