import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { read, utils } from 'xlsx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-questions',
  templateUrl: './import-questions.component.html',
  styleUrls: ['./import-questions.component.scss']
})
export class ImportQuestionsComponent implements OnInit {

  questions!: any[];

  constructor(private router: Router) { }

  ngOnInit(): void {
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
          this.questions = rows;
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  importQuestions() {
    // this.admins.map((admin) => {
    //   if (typeof admin.roles === 'string') { // check if roles is a string
    //     const rolesArray: any[] = admin.roles.split(',');
    //     const roles = rolesArray.map((role) => ({ role }));
    //     admin.roles = roles;
    //   }
    // });



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
['Multiple_choice','Which programming language is used for developing Android apps?',5,'Objective-C','Java',' C++','Swift','2 _I write 2 because correct answer number 2','If need comment for this Answer'],
['Multiple_Answers','Which programming language is used for developing Android apps?',5,'Objective-C','Java','flutter','Swift','2,3','If need comment for this Answer'],
['True_False','HTML is a programming language.',4,'True','False','','','False','If need comment for this Answer']
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
