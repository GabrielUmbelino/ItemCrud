import { TestBed, async } from '@angular/core/testing';

import { Item } from './item';
import { ItemsService } from './items.service';
import { ItemsModule } from '../items.module';
import { createComponent } from '@angular/compiler/src/core';
import { UnidadesMedidas } from './unidadesMedidas';

describe('Item Service', () => {

  let item = new Item();

  const itemsService = new ItemsService();
  const date = new Date();
  item = {
    id: 1,
    nome: 'Test Item A',
    unidadeMedida: UnidadesMedidas['kg'],
    quantidade: 1,
    preco: 1.99,
    perecivel: true,
    validade: date,
    fabricacao: date
  };

  describe('#post', () => {

    it('should post a item and return it', () => {
      itemsService.post(item)
      .then((response) => {
        expect(response).toEqual(item, 'should return the new item');
      });
    });

  });

  describe('#put', () => {
    item.nome = 'test';
    it('should put a item and return it', () => {
      itemsService.put(item)
      .then((response) => {
        expect(response).toEqual(item, 'should return the new item');
      });
    });

  });

  describe('#get', () => {
    it('should return expected items', (done: DoneFn) => {
      itemsService.get().then(items => {
        expect(items.length).toBeGreaterThan(1);
        done();
      });
    });
  });

  describe('#getItemById', () => {
    it('should return expected item', (done: DoneFn) => {
      itemsService.getItemById(item.id.toString()).then(response => {
        expect(response.nome).toEqual(item.nome, 'should return an item');
        done();
      });
    });
  });

  describe('#delete', () => {
    it('should delete a item and return true', () => {
      itemsService.delete(item.id.toString())
      .then((response) => {
        expect(response).toEqual(true, 'should return true');
      });
    });

  });

});
