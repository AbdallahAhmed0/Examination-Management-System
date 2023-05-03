import { ExamService } from './../../Services/exam.service';
import { Question, Exam, Answer } from './../../Models/exam';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-render-exam',
  templateUrl: './render-exam.component.html',
  styleUrls: ['./render-exam.component.scss'],
})
export class RenderExamComponent implements OnInit {
  exam: Exam = {} as Exam;
  responseString: string | undefined;
  answerQustion = [];

  questions: Question[] = [];
  questionForms!: any[];
  formGroup!: FormGroup;
  questionPages: Question[][] = [];
  currentPageIndex = 0;

  nextButtonLabel = 'Save';
  remainingTime: number = 0;
  attemptData: any;

  constructor(
    private examService: ExamService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const examId = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.renderExam(examId);
    // Get the array parameter from the state object
    this.attemptData = history.state.data;
    // console.log(this.attemptData);
  }

  renderExam(examId: number): void {
    this.examService.renderExam(examId).subscribe((data) => {
      this.exam = data;
      console.log(data.duration);
      this.startTimer(this.exam.duration);

      if (data.questions) {
        // Check if data.question is defined
        this.questions = data.questions;
        // this.questionPages = this.chunk(this.questions, +data.questionsPerPage);
        this.questionPages = this.chunk(this.questions, 3);
        // console.log(this.questions);
      }
      // console.log(this.exam);

      // Initialize a form group for each question
      this.questionForms = this.questions.map((question) => {
        this.formGroup = this.formBuilder.group({
          answerIds: [],
          questionIds: [],
        });
        return this.formGroup.value;
      });
    });
  }

  startTimer(duration: number) {
    this.remainingTime = duration;

    // Create a setInterval function that will update the remaining time every second
    const intervalId = setInterval(() => {
      // Calculate the remaining time by subtracting the current time from the end time
      this.remainingTime--;
      console.log(this.remainingTime);
      if (this.remainingTime <= 0) {
        this.submitExam();
        clearInterval(intervalId);
      }
    }, 1000 * 60);
  }

  chunk(questions: Question[], size: number): Question[][] {
    return Array.from(
      { length: Math.ceil(questions.length / size) },
      (_, index) => questions.slice(index * size, index * size + size)
    );
  }

  previousPage() {
    this.currentPageIndex--;
  }

  nextPage() {
    this.currentPageIndex++;
  }

  // Sanitize the HTML content with the DomSanitizer service
  sanitizeHtml(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getAnswers(): any[] {
    const answers = this.questionForms
      .map((form) => {
        const answerIdsControl = form.controls['answerIds'];
        const answerIds = answerIdsControl ? answerIdsControl.value : undefined;
        const questionIdControl = form.controls['questionId'];
        const questionId = questionIdControl
          ? questionIdControl.value
          : undefined;
        const questionType = this.questions.find(
          (q) => q.id === questionId
        )?.questionType;
        if (
          questionType === 'multiple_choice' ||
          questionType === 'true_false'
        ) {
          return {
            questionId,
            answerIds: [answerIds],
          };
        } else if (questionType === 'multiple_answers') {
          return {
            questionId,
            answerIds,
          };
        } else if (questionType === 'text') {
          return {
            questionId,
            textAnswer: answerIds,
          };
        } else {
          return undefined;
        }
      })
      .filter((answer) => !!answer);
    console.log(answers);
    return answers;
  }

  saveMultipleChoiceAnswers(answers: any[]): void {
    answers.forEach((answer) => {
      const questionId = answer.questionId;
      const selectedAnswer = answer.answerIds[0];
      if (selectedAnswer) {
        this.examService
          .saveSelectedStudentAnswer(this.attemptData.id, questionId)
          .subscribe((response) => {
            console.log(response);
          });
      }
    });
  }

  saveMultipleAnswersAnswers(answers: any[]): void {
    answers.forEach((answer) => {
      const questionId = answer.questionId;
      const selectedAnswers = answer.answerIds;
      if (selectedAnswers && selectedAnswers.length > 0) {
        selectedAnswers.forEach((selectedAnswer: number | Answer) => {
          if (selectedAnswer) {
            this.examService
              .saveSelectedStudentAnswer(this.attemptData.id, questionId)
              .subscribe((response) => {
                console.log(response);
              });
          }
        });
      }
    });
  }

  saveMatchingAnswers(answers: any[]): void {
    answers.forEach((answer) => {
      const questionId = answer.questionId;
      const textAnswer = answer.textAnswer;
      if (textAnswer) {
        this.examService
          .saveCompleteStudentAnswer(this.attemptData.id, textAnswer)
          .subscribe((response) => {
            console.log(response);
          });
      }
    });
  }

  savePage(): void {
    // if (this.exam) {
    //   const answers = this.getAnswers();
    //   this.saveMultipleChoiceAnswers(
    //     answers.filter((a) => a.answerIds && a.answerIds.length === 1)
    //   );
    //   this.saveMultipleAnswersAnswers(
    //     answers.filter((a) => a.answerIds && a.answerIds.length > 1)
    //   );
    //   this.saveMatchingAnswers(answers.filter((a) => a.textAnswer));
    //   console.log('Page saved.');
    //   console.log('Answers:', answers); // Log the current answers to the console
    // console.log(this.questionForms);
    // }
  }

  submitExam(): void {
    if (this.exam) {
      const answers = this.getAnswers();
      this.saveMultipleChoiceAnswers(
        answers.filter((a) => a.answerIds && a.answerIds.length === 1)
      );
      this.saveMultipleAnswersAnswers(
        answers.filter((a) => a.answerIds && a.answerIds.length > 1)
      );
      this.saveMatchingAnswers(answers.filter((a) => a.textAnswer));

      this.examService.endExam(this.attemptData.id).subscribe((response) => {
        console.log(response);
        // TODO: handle the response and navigate to the appropriate page
      });
    }
  }
}

// savePage() {
//   if (this.exam) {
//     const questionIds = this.questionPages[this.currentPageIndex].map(
//       (question) => question.id
//     );
//     const answers = this.questionForms
//       .map((form) => {
//         const answerIdsControl = form.controls['answerIds'];
//         const answerIds = answerIdsControl
//           ? answerIdsControl.value
//           : undefined; // <-- add check for undefined object
//         const questionIdControl = form.controls['questionId'];
//         const questionId = questionIdControl
//           ? questionIdControl.value
//           : undefined; // <-- add check for undefined object
//         const questionType = this.questions.find(
//           (q) => q.id === questionId
//         )?.questionType;
//         if (
//           questionType === 'multiple_choice' ||
//           questionType === 'true_false'
//         ) {
//           return {
//             questionId,
//             answersIds: [answerIds],
//           };
//         } else if (questionType === 'multiple_answers') {
//           return {
//             questionId,
//             answersIds: answerIds,
//           };
//         } else if (questionType === 'text') {
//           return {
//             questionId,
//             textAnswer: answerIds,
//           };
//         } else {
//           return undefined;
//         }
//       })
//       .filter((answer) => !!answer) as {
//       questionId: any;
//       answersIds?: any;
//       textAnswer?: any;
//     }[];

//     // Save answers for each question
//     for (let i = 0; i < answers.length; i++) {
//       const questionId = answers[i].questionId;
//       const questionType = this.questions.find(
//         (q) => q.id === questionId
//       )?.questionType;
//       if (
//         questionType === 'multiple_choice' ||
//         questionType === 'true_false' ||
//         questionType === 'multiple_answers'
//       ) {
//         const answerIds = answers[i].answersIds;
//         const selectedAnswer = Array.isArray(answerIds)
//           ? answerIds[0]
//           : answerIds;
//         if (selectedAnswer) {
//           this.examService
//             .saveSelectedStudentAnswer(
//               this.attemptData.id,
//               questionId,
//               selectedAnswer
//             )
//             .subscribe((response) => {
//               console.log(response);
//             });
//         }
//       } else if (questionType === 'Matching') {
//         this.examService
//           .saveCompleteStudentAnswer(
//             this.attemptData.id,
//             answers[i].textAnswer
//           )
//           .subscribe((response) => {
//             console.log(response);
//           });
//       }
//     }
//     console.log('Page saved.');
//   }
// }
