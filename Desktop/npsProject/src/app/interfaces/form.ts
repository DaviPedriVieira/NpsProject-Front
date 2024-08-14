import { QuestionModel } from "./question";

export interface FormModel {
    id: number,
    groupId: number,
    name: string,
    questions: QuestionModel[],
}
