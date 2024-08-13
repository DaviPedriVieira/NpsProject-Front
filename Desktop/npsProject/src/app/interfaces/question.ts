import { Answer } from "./answer";

export interface Question {
    id: number,
    formId: number,
    content: string,
    answers: Answer[],
}
