import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-question',
  templateUrl: './save-question.component.html',
  styleUrls: ['./save-question.component.scss']
})
export class SaveQuestionComponent implements OnInit {

  selectedComponents:any[]=[];
  sentArrayComponenet:any[]=[];
  index:number=1;
  questionData!:object;

  exam!:any;

  questions:object[]=[];
  constructor() {
    this.exam={
      examName: "Data Structure",
      duration: 100,
      startTime: "2023-03-21 01:47 PM",
      endTime: "2023-03-29 01:47 PM",
      successRate: 50,
      state: true
  };
  }
  ngOnInit(): void {
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
  addQuestion(data:object,index:number){
    this.questions[index]=data;
  }

}
