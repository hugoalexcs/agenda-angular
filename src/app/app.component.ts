//https://stackblitz.com/edit/angular-wtifyf-upolxf?file=default.html
//https://www.syncfusion.com/forums/145243/dynamicly-change-language-locale-of-an-date-format
//https://github.com/syncfusion/ej-global/blob/master/i18n/ej.culture.pt-BR.min.js
//https://stackoverflow.com/questions/57010589/how-to-set-syncfusion-components-pt-br
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { scheduleData } from './data';
import { L10n, loadCldr, setCulture, setCurrencyCode, extend } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, EventRenderedArgs, View, DayService, WeekService, WorkWeekService,
    MonthService, AgendaService, ResizeService, DragAndDropService, GroupModel
  } from '@syncfusion/ej2-angular-schedule';
  import { orderDatas } from './data-locale';

  import * as cagregorian from "./ca-gregorian.json";
  import * as currencies from "./currencies.json";
  import * as numbers from "./numbers.json";
  import * as timeZoneNames from "./timeZoneNames.json";
//setCulture('fr')
//setCurrencyCode('BRT');

loadCldr(cagregorian, currencies, numbers, timeZoneNames); // load json files
//loadCldr(currencies['default'], cagregorian['default'], numbers['default'], timeZoneNames['default']);
L10n.load({
  'en': {
    'schedule': {
      'day': 'dia',
      'week': 'semana',
      'workWeek': 'Semana de trabalho',
      'month': 'Mês',
      'agenda': 'Agenda',
      'weekAgenda': 'Agenda de da semana',
      'workWeekAgenda': 'Agenda da Semana de Trabalho',
      'monthAgenda': 'Agenda do mês',
      'today': 'Hoje',
      'noEvents': 'Sem eventos',
      'allDay': 'Todo o dia',
      'start': 'Início',
      'end': 'Fim',
      'more': 'Mais',
      'close': 'Fechar',
      'cancel': 'Cancelar',
      'noTitle': '(Sem título)',
      'delete': 'Apagar',
      'deleteEvent': 'Excluir evento',
      'selectedItems': 'Ítens selecionados',
      'deleteSeries': 'Apagar série',
      'edit': 'Editar',
      'editSeries': 'Editar série',
      'editEvent': 'Editar evento',
      'createEvent': 'Criar',
      'subject': 'Assunto',
      'addTitle': 'Adicionar título',
      'moreDetails': 'Mais detalles',
      'save': 'Salvar',
      'editContent': 'Deseja editar apenas este evento ou toda a série?',
      'deleteRecurrenceContent': 'Deseja eliminar só este evento ou toda a série?',
      'deleteContent': 'Tem certeza que deseja apagar este evento?',
      'newEvent': 'Novo evento',
      'title': 'Título',
      'location': 'Localização',
      'description': 'Descrição',
      'timezone': 'Time Zone',
      'startTimezone': 'Hora inicial',
      'endTimezone': 'Hora final',
      'repeat': 'Repetir',
      'saveButton': 'Salvar',
      'cancelButton': 'Cancelar',
      'deleteButton': 'Apagar',
      'recurrence': 'Recorrência',
      'editRecurrence': 'Editar recorrência',
      'repeats': 'Repete',
      'alert': 'Alerta',
      'startEndError': 'A data de finalização selecionada ocorre antes da da de início.',
      'invalidDateError': 'O valor da data é invalida.',
      'ok': 'Confirmar',
      'occurrence': 'Výskyt',
      'series': 'Série',
      'previous': 'Anterior',
      'next': 'Próximo',
      'timelineDay': 'Alocação de Hoje',
      'timelineWeek': 'Alocação Semanal',
      'timelineWorkWeek': 'Alocação do trabalho semanal',
      'timelineMonth': 'Alocação mensal'
    },
    'recurrenceeditor': {
      'none': 'Nenhum',
      'daily': 'Diário',
      'weekly': 'Semanal',
      'monthly': 'Mensal',
      'month': 'Mês',
      'yearly': 'Anual',
      'never': 'Nunca',
      'until': 'Até',
      'count': 'Contar',
      'first': 'Primeiro',
      'second': 'Segundo',
      'third': 'Tercero',
      'fourth': 'Quarto',
      'last': 'Último',
      'repeat': 'Repetir',
      'repeatEvery': 'Repita cada',
      'on': 'Repita en',
      'end': 'Fim',
      'onDay': 'Dia',
      'days': 'Dias)',
      'weeks': 'Semanas)',
      'months': 'Meses)',
      'years': 'Anos)',
      'every': 'cada',
      'summaryTimes': 'vecês)',
      'summaryOn': 'em',
      'summaryUntil': 'até',
      'summaryRepeat': 'Repita',
      'summaryDay': 'dias)',
      'summaryWeek': 'semanas)',
      'summaryMonth': 'meses)',
      'summaryYear': 'anos)',
      'monthWeek': 'Měsíční týden',
      'monthPosition': 'Pozice měsíce',
      'monthExpander': 'Expander měsíce',
      'yearExpander': 'Rok Expander',
      'repeatInterval': 'Interval opakování'
    },
    'calendar': {
      'today': 'Hoje'
    }
  }
});

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
  
  public group: GroupModel = {
    resources: ['Projects', 'Categories']
  };
  public projectDataSource: Object[] = [
    {text: 'PROJECT 1', id: 1, color: '#cb6bb2'},
    {text: 'PROJECT 2', id: 2, color: '#56ca85'},
    {text: 'PROJECT 3', id: 3, color: '#df5286'}
  ];
  public categoryDataSource: Object[] = [
    {text: 'Nancy', id: 1, groupId: 1, color: '#df5286'},
    {text: 'Steven', id: 2, groupId: 1, color: '#7fa900'},
    {text: 'Robert', id: 3, groupId: 2, color: '#ea7a57'},
    {text: 'Smith', id: 4, groupId: 2, color: '#5978ee'},
    {text: 'Micheal', id: 5, groupId: 3, color: '#df5286'},
    {text: 'Root', id: 6, groupId: 3, color: '#00bdae'}
  ];
  public allowMultiple: Boolean = true;
/*   public eventSettings: EventSettingsModel = {
    dataSource: extend([], resourceData.concat(timelineResourceData), null, true) as Object[]
  };
 */
  ngOnInit(): void {
    this.data = orderDatas;
    this.formatoptions = { type: 'dateTime', format: 'M/d/y' }

    this.cultureChange = true;
    //setCulture('pt'); // Change the Grid culture
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