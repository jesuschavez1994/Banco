import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  // Observable data sources
  private inputTextDataSource = new Subject<string>();

  // Observable streams
  inputTextData$ = this.inputTextDataSource.asObservable();

  // Service commands
  updateSearchInputValue(inputValue: string) {
    console.log('Search input value: ');
    console.log(inputValue);
    this.inputTextDataSource.next(inputValue);
  }
}
