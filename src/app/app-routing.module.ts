import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NothingFoundComponent } from './nothing-found/nothing-found.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'items',  loadChildren: './items/items.module.ts'},
            { path: 'nothing-found', component: NothingFoundComponent },
            { path: '**', redirectTo: 'nothing-found' }
        ])
    ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
