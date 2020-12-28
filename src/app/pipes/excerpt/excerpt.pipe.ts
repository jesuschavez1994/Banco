import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {

  transform(text: string, maxLength: number): string {

    const textLength = text.length;

    return textLength > maxLength ? text.substr(0, maxLength) + '...' : text;

  }

}
