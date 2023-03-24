import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-choice-questions',
  templateUrl: './choice-questions.component.html',
  styleUrls: ['./choice-questions.component.scss']
})
export class ChoiceQuestionsComponent implements OnInit {

  radioGroup!: FormGroup;
  toggleState = 'radio'; // initialize to radio


  constructor(private fb: FormBuilder) {
    this.radioGroup = this.fb.group({
      options: this.fb.array([])
    });
  }

  get options(): FormArray {
    return this.radioGroup.get('options') as FormArray;
  }
  toggle() {
    this.toggleState = (this.toggleState === 'radio') ? 'checkbox' : 'radio';
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
