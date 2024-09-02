export interface AnswerModel {
    id: number,
    questionId: number,
    userId: number,
    grade: number,
    description: string,
    username?: string,
    question?: string
}
