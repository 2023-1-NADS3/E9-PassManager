import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
  const valid = regex.test(control.value);
  return valid ? null : { invalidPassword: true };
}
