// VALIDACIONES PERSONALIZADAS //
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { StoreService } from '@services/store/store.service';
import { AvailabilityUser } from '@models/validators/availabilityUser.model';
import { AvailabilityEmail } from '@models/validators/availabilityEmail.model';

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

  // VALIDACION PARA SABER SI EL USERNAME EXISTE //
  static validateUserName(service: StoreService) {
    return (control: AbstractControl) => {
      const value = new AvailabilityUser(control.value);
      return service.usernameAvailability(value)
      .pipe(
        map((response: any) => {
          const isAvailable = response.available;
          console.log('Available', isAvailable);
          if (!isAvailable) {
            return {not_available: true};
          }
          return null;
        })
      );
    };
  }

  // VALIDACION PARA SABER SI EL EMAIL EXISTE //
  static validateUserEmail(service: StoreService) {
    return (control: AbstractControl) => {
      const value = new AvailabilityEmail(control.value);
      return service.emailAvailability(value)
      .pipe(
        map((response: any) => {
          const isAvailable = response.available;
          console.log('Available', isAvailable);
          if (!isAvailable) {
            return {not_available: true};
          }
          return null;
        })
      );
    };
  }

  static existInArray(options: any[]) {

    return (control?: AbstractControl, option = options): { [key: string]: boolean} => {

      const value = control.value;

      if (option.indexOf(value) === -1) {
        return {
          existIn: true
        };
      }

      return null;

    };

  }


}

function containsNumber(value: string){
  return value.split('').find(v => isNumber(v)) !== undefined;
}


function isNumber(value: string){
  return !isNaN(parseInt(value, 10));
}




