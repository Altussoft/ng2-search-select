import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Ng2SsPipe } from './../ng2-ss/ng2-ss.pipe';
import { Ng2SsComponent } from './../ng2-ss/ng2-ss.component';


@NgModule({
  declarations: [
    Ng2SsPipe,
    Ng2SsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    Ng2SsPipe,
    Ng2SsComponent
  ],
  providers: []
})
export class Ng2SelectSearchModule { }
