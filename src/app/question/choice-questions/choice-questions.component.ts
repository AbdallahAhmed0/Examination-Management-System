import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-choice-questions',
  templateUrl: './choice-questions.component.html',
  styleUrls: ['./choice-questions.component.scss']
})
export class ChoiceQuestionsComponent implements OnInit {

  radioGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.radioGroup = this.fb.group({
      options: this.fb.array([])
    });
  }

  get options(): FormArray {
    return this.radioGroup.get('options') as FormArray;
  }

  ngOnInit(): void {
  }
  addOption(): void {
    this.options.push(this.fb.control(''));
  }
  removeOption(index: number): void {
    this.options.removeAt(index);
  }
  addquestion(){
    
  }

}
