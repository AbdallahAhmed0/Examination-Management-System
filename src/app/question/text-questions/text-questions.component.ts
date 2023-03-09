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

  questionType:string='Matching';

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      questionText: ['', Validators.required],
      points: [0, Validators.required],
      questionType: [this.questionType, Validators.required],
      questionAnswers: this.fb.group({
        answerText: ['', Validators.required],
        correctAnswer: [false]
      })
    });
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
    }

