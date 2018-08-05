import { Routes, RouterModule } from '@angular/router';

import { ItemsComponent } from './items.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { NgModule } from '@angular/core';

const itemsRoutes: Routes = [
  { path: 'items', component: ItemsComponent },
  { path: 'items/new', component: ItemFormComponent },
  { path: 'items/:id', component: ItemFormComponent }
];

export const routedComponents = [ItemsComponent, ItemFormComponent];

@NgModule({
  imports: [RouterModule.forChild(itemsRoutes)],
  exports: [RouterModule]
})

export class ItemRoutingModule {}
