import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringResponsive'
})
export class stringResponsive implements PipeTransform {
 
    transform(text: string, maxLength: number): string {
    const wwindow = window.innerWidth;
    if (wwindow >= 426){
        const textLength = text.length;
        return textLength > maxLength ? text.substr(0, maxLength) + '...' : text;
    }else{
        const textLength = text.length;
        return textLength > 9 ? text.substr(0, 9) + '...' : text;
    }
    
        

  }

}
