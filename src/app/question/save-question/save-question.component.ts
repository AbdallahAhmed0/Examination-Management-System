import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../exam/Services/exam.service';
import { Exam } from './../../exam/Models/exam';
import { Question } from './../question';
import { QuestionService } from './../question.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-save-question',
  templateUrl: './save-question.component.html',
  styleUrls: ['./save-question.component.scss']
})
export class SaveQuestionComponent implements OnInit {
  consoleError: any;
  formVaild :boolean=false;
  selectedComponents:any[]=[];
  index:number=1;
  examId!: number;
  exam?:Exam;

  questions:Question[]=[];
  constructor(private examService:ExamService,
              private questionService:QuestionService,
              private router:Router,
              private _activatedRoute:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.getExamInfo();
    }


  getExamInfo() {
    this.examId = Number(this._activatedRoute.snapshot.paramMap.get('examId'));
    this.examService.getExamById(this.examId).subscribe((data) => {
      this.exam = data;
      // err => throwError(err || "an error happened while getting exam info")
    });
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
