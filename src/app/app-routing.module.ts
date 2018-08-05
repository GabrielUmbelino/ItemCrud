import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'items',  loadChildren: './items/items.module#ItemsModule'},
            { path: '**', redirectTo: 'items' }
        ])
    ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
