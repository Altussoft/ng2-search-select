import { Component, OnInit, OnChanges, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'search-select',
  // templateUrl: './ng2-ss.component.html',
  template: `
  <div class="ng2-ss" [ngStyle]="{'width': width || '350px'}">
    <div name="ng2-ss-disp" id="ng2-ss-disp" class="ng2-ss__main-input" 
    (click)="openOptions()" [ngClass]="{'ng2-ss__main-input__active': openSSOptions}">
      <span>{{ssDisplayValue?.label || 'Choose an option'}}</span>
    </div>
    <div class="ng2-ss__main-input__arrow" (click)="openOptions()">
      <span *ngIf="!openSSOptions">&#9660;</span>
      <span *ngIf="openSSOptions">&#9650;</span>
    </div>
    <div *ngIf="openSSOptions" class="ng2-ss__options">
      <div class="ng2-ss__options__header">
          Select an option
          <span (click)="closeSerSel()">&#10006;</span>
      </div>
      <div class="ng2-ss__options__search">
          <input type="text" name="ng2-ss-search" id="ng2-ss-search" #optionSearch
          class="ng2-ss__options__search__input" [(ngModel)]="ssSearchKey" />
          <div *ngIf="data.length > 1" class="ng2-ss__options__search__tabs__holder">
            <div *ngFor="let item of data; let idx = index;" (click)="showTab(idx)" class="ng2-ss__options__search__tabs" [ngClass]="{'ng2-ss__options__search__tabs__active': currTabIndex === idx}">
              <span title="{{item.title}}">{{item.title}}</span>
            </div>
          </div>
      </div>
      <div class="ng2-ss__options__holder">
        <div *ngIf="!data || data?.length < 1" (click)="selectSSItem(item)" class="ng2-ss__options__holder__item">
          <span>&nbsp;&nbsp;&nbsp;</span>Loading ...
        </div>
        <div *ngFor="let item of data; let i = index;">
          <div *ngIf="currTabIndex === i">
            <div *ngFor="let d of item.data | ng2Ss : ssSearchKey; let j = index;" (click)="selectSSItem(d, j, i)"
            class="ng2-ss__options__holder__item">
            <div *ngIf="d === -1" style="text-align:center;">No matches found</div>
            <span title="{{d.label}}"  *ngIf="d !== -1">
              <span *ngIf="defaultIndex === j && defaultTab === i">&#10004;</span>
              <span *ngIf="defaultIndex !== j || defaultTab !== i">&nbsp;&nbsp;&nbsp;</span>
              {{d.label}}
            </span>
          </div>
        </div>
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
  public currTabIndex: number = 0;
  public currOptionIndex: number = 0;

  @ViewChild('optionSearch') searchInput: ElementRef;

  @Input() width: any;
  @Input() data: any;
  @Input() defaultIndex: any;
  @Input() defaultTab: any;
  @Input() readOnly: any;

  @Output() onOpen: EventEmitter<any>  = new EventEmitter<any>();
  @Output() onClose: EventEmitter<any>  = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any>  = new EventEmitter<any>();

  constructor() { }

  /**
   * On init, make sure inputs are usable, pre-select item based on inputs,
   * remember the option or tab selection
   */
  ngOnInit() {
    this.defaultIndex = this.defaultIndex || 0;
    this.defaultTab = this.defaultTab || 0;
    if(this.data && this.data.length > 1) {
      this.ssDisplayValue = this.data[this.defaultTab].data[this.defaultIndex];
    } else if(this.data && this.data.length === 1){
      this.ssDisplayValue = this.data[0].data[this.defaultIndex];
      this.defaultTab = 0;
    }
    this.currTabIndex = this.defaultTab;
    this.currOptionIndex = this.defaultIndex;
  }
  /**
   * On change, if default index was changed, select the element.
   * If default tab was changes, switch the tab
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes.defaultIndex && !changes.defaultIndex.firstChange) {
      this.ngOnInit();
    }
    if(changes.defaultTab && !changes.defaultTab.firstChange) {
      this.showTab(this.defaultTab);
      this.ngOnInit();
    }
  }
  /**
   * Function to open the options dropdown, emit an on-open event
   * and focus on the search field in the dropdown
   */
  public openOptions() {
    this.openSSOptions = !this.openSSOptions;
    this.addListeners();
    this.onOpen.emit();
    if(this.openSSOptions) {
      setTimeout(this.focusSearch, 800);
    }
  }
  /**
   * Function to close the dropdown, remove event listeners
   * and emit a on-close event
   */
  public closeSerSel() {
    this.openSSOptions = false;
    this.removeListeners();
    this.onClose.emit();
  }
  /**
   * Funciton to select an item from the dropdown.
   * Once selected, remember the selection, emit an on-change event
   * and close the dropdown. If mutli tabs present, remember the tab.
   * @param item 
   * @param idx 
   * @param tab 
   */
  public selectSSItem(item, idx, tab) {
    this.currOptionIndex = idx;
    this.defaultIndex = idx;
    this.defaultTab = tab;
    if(typeof(item) === 'string' && item === 'default') {
    } else {
      this.ssDisplayValue = item;
    }
    this.onChange.emit(item);
    this.propagateChange(item);
    this.closeSerSel();
  }
  /**
   * Function to switch tabs and keep the focus on the search text field
   * @param i 
   */
  public showTab(i) {
    if(this.currTabIndex !== i) {
      this.currTabIndex = i;
      this.currOptionIndex = null;
      this.focusSearch();
    }
  }
  /**
   * Function to focus on the search text field
   */
  private focusSearch() {
    if(this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }
  /**
   * Function to remove event listeners
   */
  private removeListeners(): any {
    document.removeEventListener('click', this.onOutClick);
    document.removeEventListener('keyup', this.onOutClick);
  }
  /**
   * Function to add listeners to close dropdown on outside click
   */
  private addListeners(): any {
    document.addEventListener('click', this.onOutClick);
    document.addEventListener('keyup', this.onOutClick);
  }
  /**
   * Function to search for the target class and close the dropdown
   * if the click was outside the component
   */
  onOutClick = (event) => {
    console.log(event.path);
    if(event.keyCode === 27) {
      this.closeSerSel();
    } else {
      let elFound: boolean = false;
      for(let i=0;i<event.path.length;i++){
        let classList = event.path[i].classList;
        if(classList && classList.length > 0 && classList.value.indexOf('ng2-ss') > -1) {
          elFound = true;
          break;
        }
      }
      if(!elFound) {
        this.closeSerSel();
      }
    }
  }
  /**
   * Custom Form interface methods
   * @param value 
   */
  public writeValue(value: any) {
    if (!!value) {
      this.ssDisplayValue = value;
    }
  }
  /**
   * Custom Form interface methods
   */
  propagateChange = (_: any) => {};
  /**
   * Custom Form interface methods
   * @param fn 
   */
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  /**
   * Custom Form interface methods
   */
  public registerOnTouched() {

  }
}
