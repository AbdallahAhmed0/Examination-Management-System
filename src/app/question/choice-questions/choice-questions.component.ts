import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-choice-questions',
  templateUrl: './choice-questions.component.html',
  styleUrls: ['./choice-questions.component.scss']
})
export class ChoiceQuestionsComponent implements OnInit {

  @Output() onDelete = new EventEmitter<void>();
  @Output() onUP = new EventEmitter<void>();
  @Output() onDown = new EventEmitter<void>();
  @Input() indexComponent!:number;



  isMultipleChoice: boolean = false;

  form!: FormGroup;
  index:number=1;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      questionText: ['', Validators.required],
      points: [0, Validators.required],
      questionType: ['', Validators.required],
      questionAnswers: this.fb.array([this.createAnswer()])
    });
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      answerText: [`option ${this.index}`, Validators.required],
      correctAnswer: [false]
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
    }
  }


