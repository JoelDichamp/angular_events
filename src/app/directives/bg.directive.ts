import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: "[appBg]"
})

export class BgDirective {

    private element: HTMLElement;

    constructor( el: ElementRef ) {
        this.element = el.nativeElement;
        this.element.style.backgroundColor = "red";
    }
}