import { FormModel } from "./form";

export interface FormsGroupModel {
    id: number,
    name: string,
    forms: FormModel[],
}
