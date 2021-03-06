import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';

import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, effects } from './store';
import { metaReducers } from './store/reducers';

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
    CalendarModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers: [DataService, GlobalShareService],
  bootstrap: [AppComponent]
})
export class AppModule {}
