import { Component, OnInit, Input, Output, EventEmitter, forwardRef  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'search-select',
  // templateUrl: './ng2-ss.component.html',
  template: `
  <div class="ng2-ss">
    <div name="ng2-ss-disp" id="ng2-ss-disp" class="ng2-ss__main-input" 
    (click)="openOptions()" [ngClass]="{'ng2-ss__main-input__active': openSSOptions}">
    {{ssDisplayValue}}
  </div>
    <div *ngIf="openSSOptions" class="ng2-ss__options">
      <div class="ng2-ss__options__search">
          <input type="text" name="ng2-ss-search" id="ng2-ss-search" 
          class="ng2-ss__options__search__input" [(ngModel)]="ssSearchKey" />
      </div>
      <div class="ng2-ss__options__holder">
        <div class="ng2-ss__options__holder__def-item" (click)="selectSSItem('default')">
          Choose an option
        </div>
        <div *ngIf="!data" (click)="selectSSItem(item)" class="ng2-ss__options__holder__item">
          Loading ...
        </div>
        <div *ngFor="let item of data | ng2Ss : ssSearchKey; let i = index;" (click)="selectSSItem(item)"
        class="ng2-ss__options__holder__item">
          {{item.label}}
        </div>
      </div>
    </div>
  </div>
  `,
  // styleUrls: ['./ng2-ss.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Ng2SsComponent),
      multi: true
    }
  ]
})
export class Ng2SsComponent implements OnInit, ControlValueAccessor {

  public openSSOptions: boolean = false;
  public ssDisplayValue: any;

  @Input() data: any;
  @Input() readOnly: any;
  @Output() onOpen: EventEmitter<any>  = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any>  = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.ssDisplayValue = this.data[1].label;
  }
  public openOptions() {
    if(!this.readOnly) {
      this.openSSOptions = true;
      this.addListeners();
      // if(typeof this.onOpen === 'function') {
        this.onOpen.emit();
      // }
    }
  }
  public selectSSItem(item) {
    if(typeof(item) === 'string' && item === 'default') {
      console.log('default');
    } else {
      this.ssDisplayValue = item.label;
      console.log(item);
    }
    this.openSSOptions = false;
    // if(typeof this.onChange === 'function') {
    this.onChange.emit(item);
    this.propagateChange(item);
    // }
    this.removeListeners();
  }
  private removeListeners(): any {
    document.removeEventListener('click', this.onOutClick);
    // document.removeEventListener('keyup', this.onOutClick);
  }
  private addListeners(): any {
    document.addEventListener('click', this.onOutClick);
    // document.addEventListener('keyup', this.onOutClick);
  }
  onOutClick = (event) => {
    console.log(event.path);
    // let elem = _.find(_.get(event, 'path'), (el) => {
    //   if(_.indexOf(el.classList, 'notes') > -1 || _.indexOf(el.classList, 'notes__container') > -1) {
    //     return true;
    //   }
    // });
    // if(!elem || event.keyCode === 27){
    //   this.removeListeners();
    // }
  }
  public writeValue(value: any) {
    if (!!value) {
      this.ssDisplayValue = value.label;
    }
  }
  propagateChange = (_: any) => {};

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  public registerOnTouched() {

  }
}
