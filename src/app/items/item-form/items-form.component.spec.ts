import { TestBed, async } from '@angular/core/testing';

import { Item } from '../shared/item';
import { ItemsService } from '../shared/items.service';
import { ItemsModule } from '../items.module';
import { createComponent } from '../../../../node_modules/@angular/compiler/src/core';

describe('Item Service', () => {

  const date = new Date();
  describe('#get', () => {
    let expectedItems: Item[];

    beforeEach(() => {
      expectedItems = [
        {
          id: 1,
          nome: 'Test Item A',
          unidadeMedida: 'kg',
          quantidade: 1,
          preco: 1.99,
          perecivel: true,
          validade: date,
          fabricacao: date
        },
        {
          id: 2,
          nome: 'Test Item B',
          unidadeMedida: 'kg',
          quantidade: 1,
          preco: 1.99,
          perecivel: true,
          validade: date,
          fabricacao: date
        }
      ];
    });

    it('should return expected items', () => {
      const itemsService = new ItemsService();

      itemsService.itemList = expectedItems;
      itemsService.get().then(
        items => expect(items).toEqual(expectedItems, 'should return expected items')
      );
    });

    it('should no return items', () => {
      const itemsService = new ItemsService();

      itemsService.itemList = new Array<Item>();
      itemsService.get().then(
        items => expect(items.length).toEqual(0, 'should have no items')
      );
    });
  });
  describe('#post', () => {
    const itemsService = new ItemsService();
    let item: Item;
    const expectedItems = new Array<Item>();


    beforeEach(() => {
      item = {
        id: 1,
        nome: 'Test Item A',
        unidadeMedida: 'kg',
        quantidade: 1,
        preco: 1.99,
        perecivel: true,
        validade: date,
        fabricacao: date
      };
    });

    it('should post a item and return it', () => {
      expectedItems.push(item);
      itemsService.post(item).then(
        response => expect(response).toEqual(item, 'should return the new item')
      );
    });

  });

});
