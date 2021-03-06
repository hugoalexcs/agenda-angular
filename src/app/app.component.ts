import { Component, ViewEncapsulation } from '@angular/core';
import { scheduleData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, EventRenderedArgs, View, DayService, WeekService, WorkWeekService,
    MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

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
export class AppComponent {
    public data: Object[] = [] = <Object[]>extend([], scheduleData, null, true);
    public selectedDate: Date = new Date(2019, 0, 10);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public currentView: View = 'Week';

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