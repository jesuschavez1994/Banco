import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  /**
   * @description COnvierte un string separado por "," o por el separador asignado por argu
   * y retorna una array de string, si el argu isNumbers es true, entonces retornara un array de números
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 27/12/2020
   * @param {string} paramString
   * @param {boolean} [isNumbers=false]
   * @param {string} [separador=',']
   * @returns {*}  {(number[] | string [])}
   * @memberof Utils
   */
  public stringToArray(paramString: string, isNumbers: boolean = false, separador: string = ','): number[] | string []{
    const arrayString = paramString.split(separador);

    return isNumbers === false ? arrayString : arrayString.map( stringToConvert => {
      return parseInt(stringToConvert);
    });

  }

  /**
   * @description Convierte el texto en minuscula,
   * Elmina los acentos, tildes, y viñelas, por ejempli: Sí, Ñ, Ï...
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 27/12/2020
   * @param {string} text
   * @returns {*}  {string}
   * @memberof Utils
   */
  public stringToNormalize(text: string): string {

    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return text.toLowerCase();

  }

}
