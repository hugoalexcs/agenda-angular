//https://stackblitz.com/edit/angular-wtifyf-upolxf?file=default.html
//https://www.syncfusion.com/forums/145243/dynamicly-change-language-locale-of-an-date-format
//https://github.com/syncfusion/ej-global/blob/master/i18n/ej.culture.pt-BR.min.js
//https://stackoverflow.com/questions/57010589/how-to-set-syncfusion-components-pt-br
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { scheduleData } from './data';
import { L10n, loadCldr, setCulture, setCurrencyCode, extend } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, EventRenderedArgs, View, DayService, WeekService, WorkWeekService,
    MonthService, AgendaService, ResizeService, DragAndDropService
  } from '@syncfusion/ej2-angular-schedule';
  import { orderDatas } from './data-locale';
const  cagregorian =   './ca-gregorian.json';
const currencies = './currencies.json';
const numbers = './numbers.json';
const timeZoneNames = './timeZoneNames.json';
//setCulture('fr')
//setCurrencyCode('BRT');

loadCldr(cagregorian, currencies, numbers, timeZoneNames); // load json files
L10n.load({
  "en": {
      "schedule": {
          "day": "Dia",
          "week": "Semana",
          "workWeek": "Segunda a Sexta",
          "month": "Mês",
          "agenda": "Agenda",
          "weekAgenda": "Agenda da Semana",
          "workWeekAgenda": "Work Week Agenda",
          "monthAgenda": "Month Agenda",
          "today": "Hoje",
          "noEvents": "No events",
          "emptyContainer": "There are no events scheduled on this day.",
          "allDay": "All day",
          "start": "Start",
          "end": "End",
          "more": "more",
          "close": "Close",
          "cancel": "Cancel",
          "noTitle": "(No Title)",
          "delete": "Delete",
          "deleteEvent": "Delete Event",
          "deleteMultipleEvent": "Delete Multiple Events",
          "selectedItems": "Items selected",
          "deleteSeries": "Delete Series",
          "edit": "Edit",
          "editSeries": "Edit Series",
          "editEvent": "Edit Event",
          "createEvent": "Create",
          "subject": "Subject",
          "addTitle": "Add title",
          "moreDetails": "More Details",
          "save": "Save",
          "editContent": "Do you want to edit only this event or entire series?",
          "deleteRecurrenceContent": "Do you want to delete only this event or entire series?",
          "deleteContent": "Are you sure you want to delete this event?",
          "deleteMultipleContent": "Are you sure you want to delete the selected events?",
          "newEvent": "New Event",
          "title": "Title",
          "location": "Location",
          "description": "Description",
          "timezone": "Timezone",
          "startTimezone": "Start Timezone",
          "endTimezone": "End Timezone",
          "repeat": "Repeat",
          "saveButton": "Save",
          "cancelButton": "Cancel",
          "deleteButton": "Delete",
          "recurrence": "Recurrence",
          "wrongPattern": "The recurrence pattern is not valid.",
          "seriesChangeAlert": "The changes made to specific instances of this series will be cancelled and those events will match the series again.",
          "createError": "The duration of the event must be shorter than how frequently it occurs. Shorten the duration, or change the recurrence pattern in the recurrence event editor.",
          "recurrenceDateValidation": "Some months have fewer than the selected date. For these months, the occurrence will fall on the last date of the month.",
          "sameDayAlert": "Two occurrences of the same event cannot occur on the same day.",
          "editRecurrence": "Edit Recurrence",
          "repeats": "Repeats",
          "alert": "Alert",
          "startEndError": "The selected end date occurs before the start date.",
          "invalidDateError": "The entered date value is invalid.",
          "ok": "Ok",
          "occurrence": "Occurrence",
          "series": "Series",
          "previous": "Previous",
          "next": "Next",
          "timelineDay": "Timeline Day",
          "timelineWeek": "Timeline Week",
          "timelineWorkWeek": "Timeline Work Week",
          "timelineMonth": "Timeline Month"
      },
      "recurrenceeditor": {
          "none": "None",
          "daily": "Daily",
          "weekly": "Weekly",
          "monthly": "Monthly",
          "month": "Month",
          "yearly": "Yearly",
          "never": "Never",
          "until": "Until",
          "count": "Count",
          "first": "First",
          "second": "Second",
          "third": "Third",
          "fourth": "Fourth",
          "last": "Last",
          "repeat": "Repeat",
          "repeatEvery": "Repeat Every",
          "on": "Repeat On",
          "end": "End",
          "onDay": "Day",
          "days": "Day(s)",
          "weeks": "Week(s)",
          "months": "Month(s)",
          "years": "Year(s)",
          "every": "every",
          "summaryTimes": "time(s)",
          "summaryOn": "on",
          "summaryUntil": "until",
          "summaryRepeat": "Repeats",
          "summaryDay": "day(s)",
          "summaryWeek": "week(s)",
          "summaryMonth": "month(s)",
          "summaryYear": "year(s)"
      }
}});

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    /* custom code start*/
    styles: [`
    #EventLog b {
        color: #388e3c;
    }
    hr {
        margin: 1px 10px 1px 0px;
        border-top: 1px solid #eee;
    }`],
    /* custom code end*/
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent  implements OnInit  {

  

    public data: Object[] = [] = <Object[]>extend([], scheduleData, null, true);
    public selectedDate: Date = new Date(2019, 0, 10);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public currentView: View = 'Week';
    public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
  //locale='pt-Br' 
  public formatoptions: Object;
  public cultureChange = false;
  ngOnInit(): void {
    this.data = orderDatas;
    this.formatoptions = { type: 'dateTime', format: 'M/d/y' }

    this.cultureChange = true;
    setCulture('pt'); // Change the Grid culture
   setCurrencyCode('BRL');// Change the currency code

  }
  
    onClear(event): void {
        document.getElementById('EventLog').innerHTML = '';
    }
    onCreate(event): void {
      console.log(event)
        this.appendElement('Schedule <b>Load</b> event called<hr>');
    }
    onActionBegin(event): void {
      console.log(event)
        this.appendElement('Schedule <b>Action Begin</b> event called<hr>');
    }
    onActionComplete(event): void {
      console.log(event)
        this.appendElement('Schedule <b>Action Complete</b> event called<hr>');
    }
    onActionFailure(event): void {
      console.log(event)
        this.appendElement('Schedule <b>Action Failure</b> event called<hr>');
    }
    onCellDoubleClick(event): void {
      console.log(event)
        this.appendElement('SChedule <b>Cell Double Click</b> event called<hr>');
    }
    onCellClick(event): void {
      console.log(event)
        this.appendElement('Schedule <b>Cell Click</b> event called<hr>');
    }
    onNavigating(event): void {
      console.log(event)
        this.appendElement('Schedule <b>Navigating</b> event called<hr>');
    }
    onDestroyed(event): void {
      console.log(event)
        this.appendElement('Schedule <b>Destroyed</b> event called<hr>');
    }
    onEventClick(event): void {
        this.appendElement('Schedule <b>Event Click</b> event called<hr>');
    }
    onPopupOpen(event): void {
      console.log(event)
        this.appendElement('Schedule <b>Popup Open</b> event called<hr>');
    }
    public appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        if (log !== null) {
            log.insertBefore(span, log.firstChild);
        }
    }
    oneventRendered(args: EventRenderedArgs): void {
      //console.log(args)
        let categoryColor: string = args.data.CategoryColor as string;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    }
}