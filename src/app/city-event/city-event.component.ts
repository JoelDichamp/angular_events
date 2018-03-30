import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CityEvent } from '../models/CityEvent';

@Component({
    selector: 'app-city-event',
    templateUrl: './city-event.component.html',
    styleUrls: ['./city-event.component.css']
})
export class CityEventComponent {

    @Input() public usedcityevent: CityEvent;
    @Input() public participatePosition: number;

    @Output() public onClickPartipate: EventEmitter<number> = new EventEmitter();
    @Output() public onClickDescriptionResume: EventEmitter<number> = new EventEmitter();

    participateInEvent() {
        this.onClickPartipate.emit( this.participatePosition );
    }

    descriptionResumeEvent() {
        this.onClickDescriptionResume.emit( this.participatePosition );
    }
}
