import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[onlyCost]'
})
export class CostDirective {

  constructor(
    private el: ElementRef,
    private control: NgControl
  ) { }

  @HostListener('input', ['$event']) onEvent($event) {
    const initalValue = this.el.nativeElement.value;
    let value = initalValue.replace(/[^0-9.]*/g, '');
    this.control.control.setValue(value);
  }

}
