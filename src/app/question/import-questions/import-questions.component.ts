import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/exam/Models/exam';
import { read, utils } from 'xlsx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-questions',
  templateUrl: './import-questions.component.html',
  styleUrls: ['./import-questions.component.scss']
})
export class ImportQuestionsComponent implements OnInit {

  questions: any[]=[];
  data:any[]=[];

  examId!:number;

  constructor(private router: Router,
              private _activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.examId = Number(this._activateRoute.snapshot.paramMap.get('id')); // Get the ID from the route parameter

  }

  goback() {
    this.router.navigate(['exams']);
  }

  handleImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.data = rows;
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  importQuestions() {

    for (let i = 0; i < this.data.length; i++) {
      const question = this.data[i];
      let questionAnswer=[];

      // select options in question Answer
      for (let j = 1; j <= 10; j++) {
        const optionName = `option${j}`;
        if (question[optionName] && question[optionName] !== '') {
          questionAnswer.push({
            answerText:question[optionName],
            correctAnswer:false,
            comment:''
        });
        }
      }

      //select correct Answer

      // check if correctAnswer is a Matching
      if ( question.questionType == 'Matching' ) {

        questionAnswer[0].correctAnswer= question.correctAnswer;
        questionAnswer[0].comment= question.comment;

      }

      // check if correctAnswer is a Multiple_Answers or Multiple_choice or True_false
    else {
        const correctAnswer: any[] =question.correctAnswer.split(',');

        for(let answer of correctAnswer){
          answer=Number(answer);
          questionAnswer[answer-1].correctAnswer=true;
          questionAnswer[answer-1].comment= question.comment;

        }

      }


    const newQuestion = {
        questionText: question.questionText,
        points: question.points,
        questionType: question.questionType,
        questionAnswers: [...questionAnswer],
      };
      this.questions.push(newQuestion);
    }
    this.router.navigate(['save',this.examId], { state: { data: this.questions } });

  }
    exportData(){
  const headings = [
    'questionType',
    'questionText',
    'points',
    'option1',
    'option2',
    'option3',
    'option4',
    'correctAnswer',
    'comment'
];
const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
['Matching','What is your name?',2,'My name is Ahmed','','','','My name is Ahmed','If need comment for this Answer'],
['Multiple_choice','Which programming language is used for developing Android apps?',5,'Objective-C','Java',' C++','Swift','2','If need comment for this Answer'],
['Multiple_Answers','Which programming language is used for developing Android apps?',5,'Objective-C','Java','flutter','Swift','2,3','If need comment for this Answer'],
['True_False','HTML is a programming language.',4,'True','False','','','2','If need comment for this Answer']
]);
// add header row
XLSX.utils.sheet_add_aoa(ws, [headings], { origin: 'A1' });


    // Set column width
    const columns = [{ wpx: 100 }, { wpx: 150 }, { wpx: 40 },{ wpx: 130 }, { wpx: 130 }, { wpx: 120 },{ wpx: 120 }, { wpx: 120 }, { wpx: 120 }];
    ws['!cols'] = columns;

    // Set row height
    const rows = [{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 },{ hpx: 20 }];
    ws['!rows'] = rows;


    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Samble Questions.xlsx';
    link.click();
    URL.revokeObjectURL(url);

}

}
