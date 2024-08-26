export interface AnswerModel {
    id: number,
    questionId: number,
    userId: number,
    grade: number,
    description: string,
    date: Date,
    username?: string,
    questionContent?: string
}
