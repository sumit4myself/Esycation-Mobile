import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'rating',
    template: `
    <span tabindex="0" style="display: flex;">
      <div *ngFor="let item of range; let i = index">
        <ion-icon name="star" color="favorite" *ngIf="i < rate" (click)="update(i + 1)"></ion-icon>
        <ion-icon name="star-outline" *ngIf="i >= rate || rate===undefined" (click)="update(i + 1)"></ion-icon>
      </div>
    </span>
  `,
})
export class StarRating {
    private range: Array<number>;
    @Input() rate: number;
    @Output() updateRate = new EventEmitter();

    constructor() {
        this.range = [1, 2, 3, 4, 5];
    }

    update(value) {
        this.rate = value;
        this.updateRate.emit(value);
    }
}