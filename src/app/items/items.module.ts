import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {DataScrollerModule} from 'primeng/datascroller';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {CalendarModule} from 'primeng/calendar';
import {InputSwitchModule} from 'primeng/inputswitch';

import {ItemsService} from './shared/items.service';
import {ItemRoutingModule, routedComponents} from './items-routing.module';
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {ConfirmationService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { FilterItems } from './shared/filter.items';

registerLocaleData(localePt);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        DataScrollerModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        InputMaskModule,
        CurrencyMaskModule,
        CalendarModule,
        InputSwitchModule,
        ItemRoutingModule,
        DialogModule
    ],
    declarations:  [
        routedComponents,
        FilterItems
    ],

    providers: [
        ItemsService,
        ConfirmationService,
        {provide: LOCALE_ID, useValue: 'pt-BR'}
    ]
})
export class ItemsModule {}
