import { AbstractControl } from "@angular/forms";

export function positiveNumberValidator(c: AbstractControl): { [key: string]: boolean } | null {

    if (c.value !== undefined && (isNaN(c.value) || c.value < 1)) {
        return { 'value': true };
    }
    return null;
}