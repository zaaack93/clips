import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  static match(controlName:string,matchingControlName:string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);
      if (!control || !matchingControl)
        return {
          controlNotFound: false,
        };

      return control === matchingControl
        ? null
        : {
            noMatch: true,
          };
    };
  }
}
// new RegisterValidators().match ====> not static case
// RegisterValidators.match ====> static case but isn't access to attributes
