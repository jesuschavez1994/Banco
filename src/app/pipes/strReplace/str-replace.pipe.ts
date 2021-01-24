import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strReplace'
})
export class StrReplacePipe implements PipeTransform {

  transform(
    text: string,
    matchToreplace: string = ' ',
    replaceWith: string = ''
  ): string
  {
    const regExp = new RegExp(matchToreplace, 'g');
    return text.replace(regExp, replaceWith);

  }

}
