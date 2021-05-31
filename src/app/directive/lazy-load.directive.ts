import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[applazyload]'
})
export class LazyLoadDirective {
  @HostBinding('attr.src') srcAttr = '';
  @Input() dataSrc: string = '';
  browserloading: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    const supports = 'loading' in HTMLImageElement.prototype;
    const intersectionObserver = "IntersectionObserver" in window;
    
    if (supports) {
      this.browserloading = true;
      this.renderer.setAttribute(this.el.nativeElement, 'loading', 'lazy')
    } else if(intersectionObserver) {
        this.lazyLoadImage();
      } else {
        //TODO: Load images via window.scroll function
        //implemented window.scroll. See scroll.directive.ts
      }
  }
  
  ngOnInit(): void {
    this.browserloading ? this.loadImage() : '';
  }

  private lazyLoadImage() { 
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    this.srcAttr = this.dataSrc;
  }

}
