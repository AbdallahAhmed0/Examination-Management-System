import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from '../../Shared/material/dialog/dialog.component';

@Component({
  selector: 'app-text-questions',
  templateUrl: './text-questions.component.html',
  styleUrls: ['./text-questions.component.scss']
})
export class TextQuestionsComponent implements OnInit {



  form!: FormGroup;

  @Output() onDelete = new EventEmitter<void>();
  @Output() onUP = new EventEmitter<void>();
  @Output() onDown = new EventEmitter<void>();
  @Output() questionData = new EventEmitter<object>();


  @Input() indexComponent!:number;
  editquestion:object={
    
  }
  questionTextValue:string='';
  answerTextValue:string='';
  commentValue:string='';

  isHidden:boolean=false;


  questionType:string='Matching';

  constructor(private fb: FormBuilder,
              private dialog:MatDialog) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      questionText: ['', Validators.required],
      points: [0, Validators.required],
      questionType: [this.questionType, Validators.required],
      questionAnswers: this.fb.array([this.createAnswer()])

    });
    this.form.valueChanges.subscribe(value => this.questionData.emit(this.form.value));

  }
  createAnswer(): FormGroup {
    return this.fb.group({
      answerText: ['', Validators.required],
      correctAnswer: [true],
      comment:['']
    });

  }

  get answers(): FormArray {
    return this.form.get('questionAnswers') as FormArray;
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
    Up(){
      this.onUP.emit();

    }
    Down(){
      this.onDown.emit();
    }
    toggleInput() {
      this.isHidden = !this.isHidden;
    }
    }

