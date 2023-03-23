import { Component, OnInit } from '@angular/core';
import { Exam } from '../../exam/Models/exam';
import { ExamService } from '../../exam/Services/exam.service';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss']
})
export class EditQuestionsComponent implements OnInit {

  selectedComponents:any[]=[];
  sentArrayComponenet:any[]=[];
  index:number=1;
  questionData!:object;

  exam!:Exam;

  questions:object[]=[];
  constructor(private examService:ExamService) {
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
  addQuestion(data:object,index:number){
    this.questions[index]=data;
  }
}
