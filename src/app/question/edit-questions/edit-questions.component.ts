import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../exam/Services/exam.service';
import { Exam } from './../../exam/Models/exam';
import { Question } from './../question';
import { QuestionService } from './../question.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss']
})
export class EditQuestionsComponent implements OnInit {

  consoleError: any;
  formValid :boolean=false;

  selectedComponents:any[]=[];
  index:number=1;

  options:any[]=[];
  exam?:Exam;
  questions:Question[]=[];
  examId!:number;

  constructor(private examService:ExamService,
              private questionService:QuestionService,
              private router:Router,
              private _activatedRoute:ActivatedRoute) {
  }
  ngOnInit(): void {

    this.examId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  // get Questions of Exam
    this.questionService.getQuestions(this.examId).subscribe(data => {
    this.questions=data,
    this.formValid=true
  // select questions in selected Components
    this.questions.forEach(question => {

      this.selectedComponents.push({id: this.index, name: question.questionType, data: question});
      this.index++;
      });
    });

  // get Data of Exam
  this.examService.getExamById(this.examId).subscribe((data) => {
    this.exam = data;
    // err => throwError(err || "an error happened while getting exam info")
  });

  }



  showChoiceQuestions() {
    this.selectedComponents.push({id:this.index,name:'Multiple_choice'});
    this.index++;
    this.formValid=false;
  }

  showTextQuestions() {
    this.selectedComponents.push({id:this.index,name:'Matching'});
    this.index++;
    this.formValid=false;
  }

  showTextEditor() {
    this.selectedComponents.push({id:this.index,name:'coding'});
    this.index++;
    this.formValid=false;
  }
  showTrue_falseQuestions(){
    this.selectedComponents.push({id:this.index,name:'True_False'});
    this.index++;
    this.formValid=false;

  }
  removeChild(child: any) {
    if(this.questions[child.id-1]){
      this.questionService.deleteQuestion(this.questions[child.id-1]);
    }

      this.questions.splice(child.id-1,1);
      this.selectedComponents.splice(child.id-1,1);

}
removeOptions(option: any){
this.options.push(option);
}

// upChild(child: any) {
//     const index = this.selectedComponents.indexOf(child);
//     if (index >= 1) {
//       [this.selectedComponents[index],this.selectedComponents[index-1]]=[this.selectedComponents[index-1],this.selectedComponents[index]]

//     }
//   }

//   downChild(child: any) {
//     const index = this.selectedComponents.indexOf(child);
//     if (index < this.selectedComponents.length-1) {
//       [this.selectedComponents[index],this.selectedComponents[index+1]]=[this.selectedComponents[index+1],this.selectedComponents[index]]
//     }
//   }

  addQuestion(data:any,index:number){
    this.questions[index]=data;
  }

  formIsValid(valid:boolean){
  this.formValid=valid;
  }

  submit(){
    if(this.options.length){
        this.questionService.deleteOptions(this.options);
    }
    const observer = {
      next: (Question: Question[]) => {
        this.router.navigateByUrl('/exams');
        this.questionService.openSnackBar('Added');
      },
      error: (err: Error) => {
        this.consoleError = err.message;
      },
    };
    this.questionService.saveQuestions(this.questions,this.examId).subscribe(observer);

  }

}
