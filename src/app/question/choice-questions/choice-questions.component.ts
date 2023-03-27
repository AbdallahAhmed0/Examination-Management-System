import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from '../../Shared/material/dialog/dialog.component';
import { Question } from '../question';

@Component({
  selector: 'app-choice-questions',
  templateUrl: './choice-questions.component.html',
  styleUrls: ['./choice-questions.component.scss'],

})
export class ChoiceQuestionsComponent implements OnInit {

  form!: FormGroup;

  @Output() onDelete = new EventEmitter<void>();
  @Output() onUP = new EventEmitter<void>();
  @Output() onDown = new EventEmitter<void>();
  @Output() questionData = new EventEmitter<object>();
  @Output() formValid = new EventEmitter<boolean>();

  @Input() indexComponent!:number;
  @Input() editQuestion?:Question;

  questionTextValue:string='';
  answerTextValue:string='';
  commentValue:string='';

  Answer?:any;

  isMultipleChoice: boolean = false;
  isHidden:boolean[]=[false];


  constructor(private fb: FormBuilder,
              private dialog:MatDialog) {

  }

  ngOnInit(): void {
   // add questions
  this.form = this.fb.group({
    questionText: ['', Validators.required],
    points: [0, Validators.required],
    questionType: ['Multiple_choice', Validators.required],
    questionAnswers: this.fb.array([this.createAnswer()])
  });

  // edit Questions
  if(this.editQuestion){
    this.form = this.fb.group({
      questionText: [this.editQuestion?.questionText, Validators.required],
      points: [this.editQuestion?.points, Validators.required],
      questionType: [this.editQuestion?.questionType, Validators.required],
      questionAnswers: this.fb.array([this.createAnswer()])
    });

  //select Question answer
  this.Answer = this.editQuestion?.questionAnswers;
  for(let i = 0;i < this.Answer.length;i++){
  this.answers.at(i).patchValue({
    answerText: this.Answer.answerText,
    comment: this.Answer.comment});
  }
    //select Multible Answers by btn-toggle
    if(this.editQuestion?.questionType === 'Multiple_Answers'){
          this.btnToggle()
    }
  }
    this.form.valueChanges.subscribe(value =>{
      this.questionData.emit(this.form.value);
      this.formValid.emit(this.form.valid);
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
  getAnswerText(value:string,index:number){
    this.answerTextValue=value;
    this.answers.at(index).patchValue({ answerText: this.answerTextValue });

  }
  getComment(value:string,index:number){
    this.commentValue=value;
    this.answers.at(index).patchValue({ comment: this.commentValue });

  }
  onSubmit() {

  }

  autoResize(textarea: any) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  deleteQuestion(){
    const dialogRef = this.dialog.open(DialogeComponent, {
      width: '400px',
      height:'280px'
      });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {

        this.onDelete.emit();
      }
      });

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
        this.form.get('questionType')?.setValue('Multiple_Answers');
      }else{
        this.form.get('questionType')?.setValue('Multiple_choice');
      }
    }
    toggleInput(index:number) {
      this.isHidden[index] = !this.isHidden[index];
    }
    get questionText() {
      return this.form.get('questionText');
    }


  }



