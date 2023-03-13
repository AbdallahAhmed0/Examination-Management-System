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


  isMultipleChoice: boolean = false;
  isHidden:boolean[]=[false];

  form!: FormGroup;
  index:number=1;
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
      answerText: [`option ${this.index}`, Validators.required],
      correctAnswer: [false],
      comment:['']
    });

  }

  get answers(): FormArray {
    return this.form.get('questionAnswers') as FormArray;
  }

  addAnswer() {
    this.index++;
    this.answers.push(this.createAnswer());
  }

  removeAnswer(i: number) {
    this.answers.removeAt(i);
    this.index--;
  }
  onRadioChange(event:any){

    for (let i = 0; i < this.answers.length; i++) {
      if (i !== event.value) {
        this.answers.at(i).patchValue({ correctAnswer: false });
      }
    }

    (<FormArray>this.form.get('questionAnswers')).at(event.value).patchValue({ correctAnswer: true });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);

    }
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



