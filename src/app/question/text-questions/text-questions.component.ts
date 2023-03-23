import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  @Input() indexComponent!:number;

  questionTextValue:string='';
  answerTextValue:string='';
  commentValue:string='';

  isHidden:boolean=false;


  questionType:string='Matching';

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      questionText: ['', Validators.required],
      points: [0, Validators.required],
      questionType: [this.questionType, Validators.required],
      questionAnswers: this.fb.array([this.createAnswer()])

    });
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

    this.onDelete.emit();
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

