import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-choice-questions',
  templateUrl: './choice-questions.component.html',
  styleUrls: ['./choice-questions.component.scss'],

})
export class ChoiceQuestionsComponent implements OnInit {

  @Output() onDelete = new EventEmitter<void>();
  @Output() onUP = new EventEmitter<void>();
  @Output() onDown = new EventEmitter<void>();
  @Input() indexComponent!:number;

  questionTextValue:string='';
  answerTextValue:string='';
  commentValue:string='';

  isMultipleChoice: boolean = false;
  isHidden:boolean[]=[false];

  form!: FormGroup;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      questionText: ['', Validators.required],
      points: [0, Validators.required],
      questionType: ['Multiple Choice', Validators.required],
      questionAnswers: this.fb.array([this.createAnswer()])
    });
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      answerText: ['', Validators.required],
      correctAnswer: [false],
      comment:['']
    });

  }

  get answers(): FormArray {
    return this.form.get('questionAnswers') as FormArray;
  }

  addAnswer() {
    this.answers.push(this.createAnswer());
  }

  removeAnswer(i: number) {
    this.answers.removeAt(i);
  }
  onRadioChange(event:any){

    for (let i = 0; i < this.answers.length; i++) {
      if (i !== event.value) {
        this.answers.at(i).patchValue({ correctAnswer: false });
      }
    }

    (<FormArray>this.form.get('questionAnswers')).at(event.value).patchValue({ correctAnswer: true });
  }


  getQuestionText(value:string){
    this.questionTextValue=value;
    this.form.get('questionText')?.setValue(this.questionTextValue);

  }
  getAnswerText(value:string){
    this.answerTextValue=value;
    this.answers.at(0).patchValue({ answerText: this.answerTextValue });

  }
  getComment(value:string){
    this.commentValue=value;
    this.answers.at(0).patchValue({ comment: this.commentValue });

  }
  onSubmit() {
    this.form.get('questionText')?.setValue(this.questionTextValue);
    this.answers.at(0).patchValue({ answerText: this.answerTextValue });
    this.answers.at(0).patchValue({ comment: this.commentValue });

    console.log(this.form.value);
  }

  autoResize(textarea: any) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  deleteQuestion(){

    this.onDelete.emit();
    }

    Up(){
      this.onUP.emit();

    }
    Down(){
      this.onDown.emit();
    }
    btnToggle(){
      this.isMultipleChoice=!this.isMultipleChoice;
      if(this.isMultipleChoice){
        this.form.get('questionType')?.setValue('Multiple Answers');
      }else{
        this.form.get('questionType')?.setValue('Multiple Choice');
      }
    }
    toggleInput(index:number) {
      this.isHidden[index] = !this.isHidden[index];
    }

  }



