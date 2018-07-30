import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Item } from './item';

@Injectable()
export class ItemsService {
    public itemList = new Array<Item>();

    async get() {
        await null;
        return this.itemList;
    }

    async put(item: Item) {
        await null;
        return this.itemList.push(item);
    }

    async post(item: Item) {
        await null;
        item.id = new Date().getTime();
        this.itemList.push(item);
        return this.itemList[this.itemList.length - 1];
    }

    async delete(item: Item) {
        await null;
        return true;
    }

}
