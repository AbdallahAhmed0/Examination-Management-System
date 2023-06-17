export interface coding{

  id?:number,
  questionText:string,
  points:number,
  questionType:string,
  header:string,
  timeLimit:number,
  testCases:testCase[]
}
export interface testCase{

  id?:number,
  input:string,
  expectedOutput:string,
  points:number
}
