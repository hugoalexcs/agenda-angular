import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData, CommonModule } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {ScheduleModule, AgendaService, DayService, DragAndDropService, ResizeService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localePt, 'pt-PT');
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//import {HttpClientModule, HttpClientJsonpModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
/*     HttpClientModule,
    HttpClientJsonpModule, */
    ReactiveFormsModule, FormsModule,
    BrowserModule,
    AppRoutingModule,
    ScheduleModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-PT' } ,
    AgendaService, DayService, WeekService, WorkWeekService, MonthService, DragAndDropService, ResizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
