import { Routes, RouterModule, Router } from '@angular/router';

import { ItemsComponent } from './items.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { NgModule } from '../../../node_modules/@angular/core';

const itemsRoutes: Routes = [
  { path: '', component: ItemsComponent },
  { path: 'items/new', component: ItemFormComponent },
  { path: 'items/:id', component: ItemFormComponent }
];

export const routedComponents = [ItemsComponent, ItemFormComponent];

@NgModule({
  imports: [RouterModule.forChild(itemsRoutes)],
  exports: [RouterModule]
})

export class ItemRoutingModule {}
