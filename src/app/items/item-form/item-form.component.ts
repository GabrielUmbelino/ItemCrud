import { OnInit, Component } from '@angular/core';
import { Item } from '../shared/item';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../shared/items.service';
import { UnidadesMedidas } from '../shared/unidadesMedidas';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['./item-form.component.css'],
    providers:  [ ItemsService ],
    animations: [routerTransition()],
    // tslint:disable-next-line:use-host-property-decorator
    host: {'[@routerTransition]': ''}
})
export class ItemFormComponent implements OnInit {

    form: FormGroup;
    item = new Item();
    title = 'Item';
    medidas = [];
    submited: Boolean;
    confirmDelete: Boolean;

    display = false;
    msgContent: String;
    unitRules: any;


    constructor(
        private router: Router,
        private itemsService: ItemsService,
        private activatedRoute: ActivatedRoute
    ) {

        this.form = new FormGroup({
            'nome': new FormControl(this.item.nome, [
              Validators.required,
              Validators.minLength(3)
            ]),
            'unidadeMedida': new FormControl(this.item.unidadeMedida, [
                Validators.required
            ]),
            'quantidade': new FormControl(this.item.quantidade, null),
            'preco': new FormControl(this.item.preco, [
                Validators.required
            ]),
            'fabricacao': new FormControl(this.item.fabricacao, [
                Validators.required
            ]),
            'validade': new FormControl(this.item.validade, null),
            'perecivel': new FormControl(this.item.perecivel, null),
        }
        );

        this.form.get('perecivel').valueChanges.subscribe(data => this.onPerecivelChanged(data));

        for (const un in UnidadesMedidas) {
            if (UnidadesMedidas.hasOwnProperty(un)) {
                this.medidas.push({'value': un, 'label': UnidadesMedidas[un]});
            }
        }

        this.unitRules = {
            lt: {
                precision: 3,
                prefix: '',
                suffix: ' lt',
                decimal: ',',
                thousands: '.'
            },
            kg: {
                precision: 3,
                prefix: '',
                suffix: ' kg',
                decimal: ',',
                thousands: '.'
            },
            un: {
                precision: 0,
                prefix: '',
                suffix: ' un',
                thousands: '.'
            },
            default: {
                precision: 0,
                prefix: '',
                suffix: '',
                thousands: '.'
            }
        };
    }

    ngOnInit(): any {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (Boolean(id)) {
            this.getItem(id);
        }
    }
    get nome() { return this.form.get('nome'); }
    get unidadeMedida() { return this.form.get('unidadeMedida'); }
    get preco() { return this.form.get('preco'); }
    get quantidade() { return this.form.get('quantidade'); }
    get fabricacao() { return this.form.get('fabricacao'); }
    get validade() { return this.form.get('validade'); }
    get perecivel() { return this.form.get('perecivel'); }

    onPerecivelChanged(value: any) {

        if (value) {
            this.validade.setValidators([Validators.required]);
        } else {
            this.validade.setValidators([]);
        }

        this.validade.updateValueAndValidity();
    }

    getItem(id: String) {
        let promisse: any;
        promisse = this.itemsService.getItemById(id);

        promisse
        .then( (item) => {
            item.fabricacao = item.fabricacao ? new Date(item.fabricacao) : item.fabricacao ;
            item.validade = item.validade ? new Date(item.validade) : item.validade ;
            this.item = item;
        });
    }

    save() {

        if (this.form.invalid && !this.fabricationValidate()) {
            this.submited = true;
            return false;
        }

        let promisse: any;

        if (this.item.id) {
            promisse = this.itemsService.put(this.item);
        } else {
            promisse = this.itemsService.post(this.item);
        }

        promisse
        .then( (data) => {
            this.gotoList();
        });
    }

    cancel() {
        this.gotoList();
    }

    gotoList() {
        this.router.navigate(['']);
    }

    formatDate(date) {
        return this.itemsService.formatDate(date);
    }

    delete() {
        this.itemsService.delete(this.item.id.toString())
        .then((response) =>  {
            if (response) {
                this.showDialog('Item removido');
                setTimeout(() => {
                    this.gotoList();
                }, 3000);
            } else {
                this.showDialog('Não foi possivel remover o item');
            }
        });
    }

    showDialog(content: String) {
        this.msgContent = content;
        this.display = true;
        setTimeout(() => {
            this.display = false;
        }, 12000);
    }

    isExpired(item: Item) {
        return this.itemsService.isExpired(item.validade);
    }

    fabricationValidate() {

        if (!this.item.perecivel) {
            return false;
        }
        if (!this.item.validade) {
            return false;
        }

        if (!this.item.fabricacao) {
            return false;
        }

        return this.item.fabricacao.getTime() > this.item.validade.getTime();
    }


}
