import {Component, OnInit} from '@angular/core';
import {ItemsService} from './shared/items.service';
import {Item} from './shared/item';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {UnidadesMedidas} from './shared/unidadesMedidas';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css'],
    animations: [routerTransition()],
    // tslint:disable-next-line:use-host-property-decorator
    host: {'[@routerTransition]': ''}

  })

export class ItemsComponent implements OnInit {

    private items: Item[] = [];
    title = 'Itens';
    searchTerm = '';
    loading = false;
    constructor(
        private itemsService: ItemsService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.itemsService.get()
        .then( (data) => {
            this.items = data ? data : [];
        });
    }

    add() {
        this.router.navigate(['/items/new']);
    }

    edit(id) {
        this.router.navigate(['/items', id]);
    }

    formatDate(date) {
        return this.itemsService.formatDate(date);
    }

    getUnidadeMedida(un) {
        return UnidadesMedidas[un];
    }

    isExpired(item: Item) {
        return this.itemsService.isExpired(new Date(item.validade));
    }
    filterItems(term: string) {
        this.loading = true;
        this.itemsService.search(term)
        .then( (data) => {
            this.items = data ? data : [];
            this.loading = false;
        });
    }
}
