import { Component, EventEmitter, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent {
  @Output() itemSearched = new EventEmitter<string>();
  searched = new Subject<string>()

  constructor() {
    this.searched.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      this.itemSearched.emit(value)
    })
  }

  OnInputChange(changed: Event): void {
    const input = changed.target as HTMLInputElement
    this.searched.next(input.value.trim())
  }
}
