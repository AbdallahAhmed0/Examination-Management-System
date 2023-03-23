import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../exam/Services/exam.service';
import { Exam } from './../../exam/Models/exam';
import { Question } from './../question';
import { QuestionService } from './../question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-question',
  templateUrl: './save-question.component.html',
  styleUrls: ['./save-question.component.scss']
})
export class SaveQuestionComponent implements OnInit {
  consoleError: any;

  selectedComponents:any[]=[];
  sentArrayComponenet:any[]=[];
  index:number=1;
  questionData!:object;

  exam?:Exam;

  questions:Question[]=[];
  constructor(private examService:ExamService,
              private questionService:QuestionService,
              private router:Router) {
  }
  ngOnInit(): void {
    this.examService.getExamById(2).subscribe(data => {
      this.exam=data;
    })
  }


  showChoiceQuestions() {
    this.selectedComponents.push({id:this.index,name:'choice'});
    this.index++;
  }

  showTextQuestions() {
    this.selectedComponents.push({id:this.index,name:'text'});
    this.index++;
  }

  showTextEditor() {
    this.selectedComponents.push({id:this.index,name:'coding'});
    this.index++;
  }
  showTrue_falseQuestions(){
    this.selectedComponents.push({id:this.index,name:'true_false'});
    this.index++;

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
