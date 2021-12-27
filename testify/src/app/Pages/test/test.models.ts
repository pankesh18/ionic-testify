
export class Test{
  TestId: number
  TestName: string
  CourseId: number
  CourseName: string
  CreatedBy: any
  QuestionList:Question[] = []

}



export class Question
{
  QuestionId: number
  QuestionBody: String
  QuestionTypeId: number
  TopicId: number
  TopicName: String
  TestId: number
  OptionList:Option[]= []
  QuestionImageList:any[]=[];
  QuestionFileList:any[]=[];
  QuestionFileNameList:any[]=[];
}

export class Option{
  OptionId: number
  OptionBody: String
  IsCorrect:number
  QuestionId:number
}
