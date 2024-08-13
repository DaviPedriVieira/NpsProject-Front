import { Form } from "@angular/forms";

export interface FormsGroup {
    id: number,
    name: string,
    forms: Form[],
}
