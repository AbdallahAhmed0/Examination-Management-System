import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from '../../../Shared/material/dialog/dialog.component';
import { Question } from '../../Models/question';

@Component({
  selector: 'app-true-false-question',
  templateUrl: './true-false-question.component.html',
  styleUrls: ['./true-false-question.component.scss']
})
export class TrueFalseQuestionComponent implements OnInit {

  form!: FormGroup;

  @Output() onDelete = new EventEmitter<void>();
  // @Output() onUP = new EventEmitter<void>();
  // @Output() onDown = new EventEmitter<void>();
  @Output() questionData = new EventEmitter<object>();
  @Output() formValid = new EventEmitter<boolean>();

  @Input() indexComponent!: number;
  @Input() editQuestion?: Question;

  questionTextValue: string = '';
  answerTextValue: string = '';
  commentValue: string = '';

  Answer?: any;

  isMultipleChoice: boolean = false;
  isHidden: boolean[] = [false];


  constructor(private fb: FormBuilder,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    // add questions
    this.form = this.fb.group({
      questionText: ['', Validators.required],
      points: [0, Validators.required],
      questionType: ['True_False', Validators.required],
      questionAnswers: this.fb.array([this.createAnswer()])
    });

    // edit Questions
    if (this.editQuestion) {
      if (this.editQuestion.id) {
        this.form = this.fb.group({
          id: [this.editQuestion.id],
          questionText: [this.editQuestion.questionText, Validators.required],
          points: [this.editQuestion.points, Validators.required],
          questionType: ['True_False', Validators.required],
          questionAnswers: this.fb.array([this.createAnswer()])
        });
      }
      else {
        this.form = this.fb.group({
          questionText: [this.editQuestion.questionText, Validators.required],
          points: [this.editQuestion.points, Validators.required],
          questionType: ['True_False', Validators.required],
          questionAnswers: this.fb.array([this.createAnswer()])
        });
      }
      //select Question answer
      this.Answer = this.editQuestion.questionAnswers[0];
      this.answers.at(0).patchValue({
        id: this.Answer.id,
        answerText: this.Answer.answerText,
        comment: this.Answer.comment
      });
    }
    this.form.valueChanges.subscribe(value => {
      this.questionData.emit(this.form.value);
      this.formValid.emit(this.form.valid);
    });

  }

  createAnswer(): FormGroup {
    return this.fb.group({
      id: [],
      answerText: ['', Validators.required],
      correctAnswer: [true],
      comment: ['']
    });

  }

  get answers(): FormArray {
    return this.form.get('questionAnswers') as FormArray;
  }



  getQuestionText(value: string) {
    this.questionTextValue = value;
    this.form.get('questionText')?.setValue(this.questionTextValue);

  }
  getAnswerText(value: string, index: number) {
    this.answerTextValue = value;
    this.answers.at(index).patchValue({ answerText: this.answerTextValue });

  }
  getComment(value: string, index: number) {
    this.commentValue = value;
    this.answers.at(index).patchValue({ comment: this.commentValue });

  }
  onSubmit() {

  }

  autoResize(textarea: any) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  deleteQuestion() {

    const dialogRef = this.dialog.open(DialogeComponent, {
      width: '400px',
      height: '280px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {

        this.onDelete.emit();
      }
    });
  }

  // Up(){
  //   this.onUP.emit();

  // }
  // Down(){
  //   this.onDown.emit();
  // }

  toggleInput(index: number) {
    this.isHidden[index] = !this.isHidden[index];
  }
}
