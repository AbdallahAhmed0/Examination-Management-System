import { RenderExamComponent } from './Components/render-exam/render-exam.component';
import { EditExamComponent } from './Components/edit-exam/edit-exam.component';
import { AddExamComponent } from './Components/add-exam/add-exam.component';
import { AllExamsComponent } from './Components/all-exams/all-exams.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component:AllExamsComponent},
  {path:'exams',component:AllExamsComponent},
  {path:'exams/add',component:AddExamComponent},
  {path:'exams/edit/:id',component:EditExamComponent},
  {path:'exams/render',component:RenderExamComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
