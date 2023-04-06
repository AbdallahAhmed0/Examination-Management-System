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
  formVaild :boolean=false;

  selectedComponents:any[]=[];
  index:number=1;

  editquestions:Question[]=[];
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
    this.editquestions=data;
    this.questions=data;
  // select questions in selected Components
    this.editquestions.forEach(question => {

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
    const idQuestion = this.questions.indexOf(child.id);

      this.selectedComponents.splice(index, 1);
      this.questions.splice(idQuestion,1);
      this.questionService.deleteQuestion(child);

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
  console.log(this.formVaild)
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
    this.questionService.saveQuestions(this.questions,this.examId).subscribe(observer);
    console.log(this.questions)
  }

}
