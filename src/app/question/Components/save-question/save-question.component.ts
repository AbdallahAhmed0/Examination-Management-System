import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../exam/Services/exam.service';
import { Exam } from '../../../exam/Models/exam';
import { Question } from '../../Models/question';
import { QuestionService } from '../../Services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { coding } from '../../Models/codingQuestion';

@Component({
  selector: 'app-save-question',
  templateUrl: './save-question.component.html',
  styleUrls: ['./save-question.component.scss']
})
export class SaveQuestionComponent implements OnInit {

  consoleError: any;
  formValid: boolean = false;

  selectedComponents: any[] = [];
  index: number = 1;

  options: any[] = [];
  testCases:any[]=[]
  exam?: Exam;

  questions!: Question[] ;
  codeQuestions!:coding[];

  examId: number = 0;

  importQuestions!: Question[];

  constructor(private examService: ExamService,
    private questionService: QuestionService,
    private router: Router,
    private _activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {

    this.examId = Number(this._activatedRoute.snapshot.paramMap.get('id'));



    // get Standrad Questions of Exam
    this.questionService.getQuestions(this.examId).subscribe(data => {
        this.questions = data,
        this.formValid = true

         // select standard questions in selected Components
          this.questions.forEach(question => {

            this.selectedComponents.push({ id: this.index, name: question.questionType, data: question });
            this.index++;
          });

      });

      // get Coding Questions of Exam
    this.questionService.getCodeQuestionByExamId(this.examId).subscribe(data => {
        this.codeQuestions = data,
        this.formValid = true
         // select Coding questions in selected Components
            this.codeQuestions.forEach(question => {

              this.selectedComponents.push({ id: this.index, name: question.questionType, data: question });
              this.index++;
            });

      });

      // Get the array parameter from the state object
      this.importQuestions = history.state.data;

      if (this.importQuestions) {

        this.importQuestions.forEach(question => {

          this.selectedComponents.push({ id: this.index, name: question.questionType, data: question });
          this.index++;
        });
        this.questions.push(...this.importQuestions)
      }



    // get Data of Exam
    this.examService.getExamById(this.examId).subscribe((data) => {
      this.exam = data;
      // err => throwError(err || "an error happened while getting exam info")
    });

  }



  showChoiceQuestions() {
    this.selectedComponents.push({ id: this.index, name: 'Multiple_choice' });
    this.index++;
    this.formValid = false;
  }

  showTextQuestions() {
    this.selectedComponents.push({ id: this.index, name: 'Matching' });
    this.index++;
    this.formValid = false;
  }

  showCodingQuestion() {
    this.selectedComponents.push({ id: this.index, name: 'CODING' });
    this.index++;
    this.formValid = false;
  }
  showTrue_falseQuestions() {
    this.selectedComponents.push({ id: this.index, name: 'True_False' });
    this.index++;
    this.formValid = false;

  }
  removeChild(child: any) {
    if (this.questions[child.id - 1]) {
      this.questionService.deleteQuestion(this.questions[child.id - 1]);
    }

    this.questions.splice(child.id - 1, 1);
    this.selectedComponents.splice(child.id - 1, 1);

  }
  removeChildCode(id:number,child: any) {
    console.log(id)
    if (this.codeQuestions[child.id - 1]) {
      this.questionService.deleteCodeQuestionById(id);
    }

    this.codeQuestions.splice(child.id - 1, 1);
    console.log(this.codeQuestions);
    this.selectedComponents.splice(child.id - 1, 1);
  }
  removeOptions(option: any) {
    this.options.push(option);
  }
  removeTestCases(testCase: any) {
    this.testCases.push(testCase);
  }

  // upChild(child: any) {
  //     const index = this.selectedComponents.indexOf(child);
  //     if (index >= 1) {
  //       [this.selectedComponents[index],this.selectedComponents[index-1]]=[this.selectedComponents[index-1],this.selectedComponents[index]]

  //     }
  //   }

  //   downChild(child: any) {
  //     const index = this.selectedComponents.indexOf(child);
  //     if (index < this.selectedComponents.length-1) {
  //       [this.selectedComponents[index],this.selectedComponents[index+1]]=[this.selectedComponents[index+1],this.selectedComponents[index]]
  //     }
  //   }

  addQuestion(data: any, index: number) {
    this.questions[index] = data;
  }
  addCodeQuestion(data: any, index: number) {
    this.codeQuestions[index] = data;
  }
  formIsValid(valid: boolean) {
    this.formValid = valid;
  }

  submit() {
    if (this.options.length) {
      this.questionService.deleteOptions(this.options);
    }
    if (this.testCases.length) {
      this.questionService.deleteTestCases(this.testCases);
    }
    const observer = {
      next: (Question: any[]) => {
        this.router.navigateByUrl('/exams');
        this.questionService.openSnackBar('Added');
      },
      error: (err: Error) => {
        this.consoleError = err.message;
      },
    };
    //add standard questions
    this.questionService.saveQuestions(this.questions, this.examId).subscribe(observer);
    //add coding questions
    this.questionService.saveCodeQuestions(this.codeQuestions, this.examId).subscribe(observer);
  }
  importData(id: any) {
    this.router.navigate([`save/${id}/import`]);
  }

}
