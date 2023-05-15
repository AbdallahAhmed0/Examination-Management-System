export interface coding{

  id?:number,
  name:string,
  time:string,
  memory:string,
  descInput:string,
  descOutput:string,
  testCases:testCase[]
}
export interface testCase{

  id?:number,
  input:number[],
  output:number[]
}
