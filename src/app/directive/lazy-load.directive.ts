import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[applazyload]'
})
export class LazyLoadDirective {
  @HostBinding('attr.src') srcAttr = '';
  @Input() dataSrc: string = '';
  constructor({ nativeElement }: ElementRef<HTMLImageElement>,private el: ElementRef) {
    const supports = 'loading' in HTMLImageElement.prototype;
    const intersectionObserver = "IntersectionObserver" in window;

    if (!supports) {
      nativeElement.setAttribute('loading', 'lazy');
      this.el.nativeElement.setAttribute('src',this.dataSrc)
    } else if(intersectionObserver) {
        this.lazyLoadImage();
      } else {
        this.loadImage();
        //TODO: Load image via scroll function
      }
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
