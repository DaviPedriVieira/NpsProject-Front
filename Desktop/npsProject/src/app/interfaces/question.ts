import { AnswerModel } from "./answer";

export interface QuestionModel {
    id: number,
    formId: number,
    content: string,
    answers: AnswerModel[],
}
