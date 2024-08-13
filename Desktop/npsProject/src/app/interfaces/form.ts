import { Question } from "./question";

export interface Form {
    id: number,
    groupId: number,
    name: string,
    questions: Question[],
}
