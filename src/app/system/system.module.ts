import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import {BillCardComponent} from './bill-page/bill-card/bill-card.component';
import {CurrencyCardComponent} from './bill-page/currency-card/currency-card.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {DropdownDirective} from './shared/directives/dropdown.directive';
import {MomentPipe} from './shared/pipes/moment.pipe';
import {AddEventComponent} from './records-page/add-event/add-event.component';
import {AddCategoryComponent} from './records-page/add-category/add-category.component';
import {EditCategoryComponent} from './records-page/edit-category/edit-category.component';
import {HistoryChartComponent} from './history-page/history-chart/history-chart.component';
import {HistoryEventsComponent} from './history-page/history-events/history-events.component';
import {HistoryDetailsComponent} from './history-page/history-details/history-details.component';
import {HistoryFilterComponent} from './history-page/history-filter/history-filter.component';
import {NgChartsModule} from 'ng2-charts';
import { FilterPipe } from './shared/pipes/filter.pipe';

@NgModule({
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective,
    BillCardComponent,
    CurrencyCardComponent,
    MomentPipe,
    AddEventComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    HistoryChartComponent,
    HistoryEventsComponent,
    HistoryDetailsComponent,
    HistoryFilterComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    NgChartsModule
  ]
})

export class SystemModule {
}
