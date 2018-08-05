import { Component, OnInit } from '@angular/core';
import { ItemsService } from './shared/items.service';
import { Item } from './shared/item';
import {TableModule} from 'primeng/table';
import {routerTransition} from '../router.animations';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']
    animations: [routerTransition()],
    // tslint:disable-next-line:use-host-property-decorator
    host: {'[@routerTransition]': ''}
  })

export class ItemsComponent implements OnInit {

    private items: Item[] = [];
    constructor(private itemsService: ItemsService) { }
    ngOnInit() {
        this.itemsService.get()
        .then( (data) => {
            this.items = data;
        });
    }
    // deleteUser(user){
    //   if (confirm("Are you sure you want to delete " + user.name + "?")) {
    //     var index = this.users.indexOf(user);
    //     this.users.splice(index, 1);
    //     this.usersService.deleteUser(user.id)
    //       .subscribe(null,
    //         err => {
    //           alert("Could not delete user.");
    //           // Revert the view back to its original state
    //           this.users.splice(index, 0, user);
    //         });
    //   }
    // }
}
