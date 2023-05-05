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


}

}
