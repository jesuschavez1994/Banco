// VALIDACIONES PERSONALIZADAS //
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { StoreService } from '@services/store/store.service';

export class MyValidators {

  static validPassword(control: AbstractControl) {
    const value = control.value;
    if (!containsNumber(value)) {
      return {invalid_password: true};
    }
    return null;
  }

  static matchPasswords(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      return {match_password: true};
    }
    return null;
  }

  static validateUserName(service: StoreService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return service.usernameAvailability(value)
      .pipe(
        map((response: any) => {
          const isAvailable = response.isAvailable;
          if (!isAvailable) {
            return {not_available: true};
          }
          return null;
        })
      );
    };
  }

}

function containsNumber(value: string){
  return value.split('').find(v => isNumber(v)) !== undefined;
}


function isNumber(value: string){
  return !isNaN(parseInt(value, 10));
}
