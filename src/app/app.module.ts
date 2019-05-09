import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { GlobalShareService } from './share/share.service';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    CalendarModule
  ],
  providers: [DataService, GlobalShareService],
  bootstrap: [AppComponent]
})
export class AppModule {}
