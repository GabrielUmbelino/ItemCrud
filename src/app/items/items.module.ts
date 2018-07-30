import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {CalendarModule} from 'primeng/calendar';
import {InputSwitchModule} from 'primeng/inputswitch';

import {ItemsComponent} from './items.component';
import {ItemsService} from './shared/items.service';
import {ItemFormComponent} from './item-form/item-form.component';
import { ItemRoutingModule, routedComponents } from './items-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        TableModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        InputMaskModule,
        CurrencyMaskModule,
        CalendarModule,
        InputSwitchModule,
        ItemRoutingModule
    ],
    declarations:  [
        ItemsComponent,
        ItemFormComponent,
        routedComponents
    ],
    exports: [
        ItemsComponent
    ],
    providers: [
        ItemsService
    ]
})
export class ItemsModule {}
