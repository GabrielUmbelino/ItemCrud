import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable()
export class ItemsService {

    async get() {
        await null;
        return this.getItems();
    }

    async put(item: Item) {
        await null;
        return this.setItem(item);
    }

    async post(item: Item) {
        await null;
        item.id = new Date().getTime();
        return this.setItem(item);
    }

    async delete(id: String) {
        await null;
        let items = this.getItems();
        items = Boolean(items.length) ? items : [];
        for (const i in items) {
            if (id === items[i].id.toString()) {
                items.splice(i, 1);
                localStorage.setItem('items', JSON.stringify(items));
                return true;
            }
        }
        return false;
    }

    async getItemById(id: String) {
        await 200;
        let items = this.getItems();
        items = Boolean(items.length) ? items : [];
        for (const i in items) {
            if (id === items[i].id.toString()) {
                return items[i];
            }
        }
    }

    async search(term: String) {
        await 300;

        const items  = this.getItems();
        let filteredItems: Item[];

        if (!term) {
            this.getItems();
        }
        filteredItems = Object.assign([], items).filter(
            item => item.nome.toLowerCase().indexOf(term.toLowerCase()) > -1
        );

        return filteredItems;
    }

    private getItems() {
        let items = JSON.parse(localStorage.getItem('items'));
        items = items ? items : [];
        return items;
    }

    private setItem(item) {
        let items = this.getItems();
        items = Boolean(items.length) ? items : [];

        // if the item id alread exists then updates it
        for (const i in items) {
            if (item.id === items[i].id) {
                items[i] = item;
                localStorage.setItem('items', JSON.stringify(items));
                return item;
            }
        }

        // or then push up the new one
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        return item;
    }

    formatDate(string_date) {
        const date = new Date(string_date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        function lpad(digit) {
            digit = `${digit}`.length < 2 ? `0${digit}` : digit;
            return digit;
        }

        return `${lpad(day)}/${lpad(month)}/${year}`;
    }
    isExpired(validity: Date) {
        if (!validity) {
            return false;
        }
        const now = Date.now();

        return validity.getTime() < now;
    }
}
