import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../exam/Services/exam.service';
import { Exam } from './../../exam/Models/exam';
import { Question } from './../question';
import { QuestionService } from './../question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss']
})
export class EditQuestionsComponent implements OnInit {

  consoleError: any;
  formVaild :boolean=false;

  selectedComponents:any[]=[];
  index:number=1;

  editquestions:Question[]=[];
  exam?:Exam;
  questions:Question[]=[];

  constructor(private examService:ExamService,
              private questionService:QuestionService,
              private router:Router) {
  }
  ngOnInit(): void {

  // get Questions of Exam
    this.questionService.getQuestions(2).subscribe(data => {
    this.editquestions=data;
  // select questions in selected Components
    this.editquestions.forEach(question => {

      this.selectedComponents.push({id: this.index, name: question.questionType, data: question});
      this.index++;
      });

    });

  // get Data of Exam
    this.examService.getExamById(2).subscribe(data =>{
    this.exam=data;
})
  }



  showChoiceQuestions() {
    this.selectedComponents.push({id:this.index,name:'Multiple_choice'});
    this.index++;
    this.formVaild=false;
  }

  showTextQuestions() {
    this.selectedComponents.push({id:this.index,name:'Matching'});
    this.index++;
    this.formVaild=false;
  }

  showTextEditor() {
    this.selectedComponents.push({id:this.index,name:'coding'});
    this.index++;
    this.formVaild=false;
  }
  showTrue_falseQuestions(){
    this.selectedComponents.push({id:this.index,name:'True_False'});
    this.index++;
    this.formVaild=false;

  }
  removeChild(child: any) {
    const index = this.selectedComponents.indexOf(child);
    if (index >= 0) {
      this.selectedComponents.splice(index, 1);
    }
}

upChild(child: any) {
    const index = this.selectedComponents.indexOf(child);
    if (index >= 1) {
      [this.selectedComponents[index],this.selectedComponents[index-1]]=[this.selectedComponents[index-1],this.selectedComponents[index]]
    }
  }

  downChild(child: any) {
    const index = this.selectedComponents.indexOf(child);
    if (index < this.selectedComponents.length-1) {
      [this.selectedComponents[index],this.selectedComponents[index+1]]=[this.selectedComponents[index+1],this.selectedComponents[index]]
    }
  }

  addQuestion(data:any,index:number){
    this.questions[index]=data;
  }

  formIsValid(valid:boolean){
  this.formVaild=valid;
  }

  submit(){
    const observer = {
      next: (Question: Question[]) => {
        this.router.navigateByUrl('/exams');
        this.questionService.openSnackBar('Added');
      },
      error: (err: Error) => {
        this.consoleError = err.message;
      },
    };
    this.questionService.saveQuestions(this.questions,2).subscribe(observer);
    console.log(this.questions)
  }

}
