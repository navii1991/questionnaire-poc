import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  @Output() scrollingFinished = new EventEmitter<void>();
  @Input() loadMoreBtn = false;
  emitted = false;

  // if(this.loadMoreBtn:boolean) {
  
  // }
  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.emitted) {
      this.emitted = true;
      this.scrollingFinished.emit();
    } else if ((window.innerHeight + window.scrollY) < document.body.offsetHeight) {
      this.emitted = false;
    }
  }
  constructor() { 
    this.loadMoreBtn = false;
  }

}
