import { AddImageDirectiveDirective } from './add-image-directive.directive';
import { Directive, ElementRef, Renderer2,HostListener} from '@angular/core';


describe('AddImageDirectiveDirective', () => {
  it('should create an instance', () => {
    const directive = new AddImageDirectiveDirective();
    expect(directive).toBeTruthy();
  });
});
