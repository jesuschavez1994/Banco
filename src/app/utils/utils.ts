import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  public stringToArray(paramString: string, isNumbers: boolean = false, separador: string = ','): number[] | string []{
    const arrayString = paramString.split(separador);

    return isNumbers === false ? arrayString: arrayString.map( stringToConvert => {
      return parseInt(stringToConvert);
    });

  }

}
