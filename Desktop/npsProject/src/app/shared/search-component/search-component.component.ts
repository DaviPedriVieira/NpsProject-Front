import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent {
  @ViewChild('searchInput') searchInput!: ElementRef
  @Output() itemSearched = new EventEmitter<string>();
  searched = new Subject<string>()

  constructor() {
    this.searched.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      this.itemSearched.emit(value)
    })
  }
  
  resetSearch() {
    this.searchInput.nativeElement.value = ''
  }

  OnInputChange(changed: Event) {
    const input = changed.target as HTMLInputElement
    const value = input.value.trim()
    this.searched.next(value)
  }
}
