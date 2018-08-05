import { OnInit, Component } from '@angular/core';
import { Item } from '../shared/item';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../shared/items.service';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-item-form',
    templateUrl: './item-form.component.html',
    styleUrls: ['./item-form.component.css']
    animations: [routerTransition()],
    // tslint:disable-next-line:use-host-property-decorator
    host: {'[@routerTransition]': ''}
})
export class ItemFormComponent implements OnInit {

    form: FormGroup;
    item = new Item();
    title = 'Item';

    public unidadeMedidas = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private itemService: ItemsService
    ) {
        this.unidadeMedidas = [
            {label: 'Kilograma', value: 'kg'},
            {label: 'Litro', value: 'lt'}
        ];
        this.form = new FormGroup({
            'nome': new FormControl(this.item.nome, [
              Validators.required,
              Validators.minLength(3)
            ]),
            'unidadeMedida': new FormControl(this.item.unidadeMedida, [
                    Validators.required
                ]
            )
        });
    }

    ngOnInit(): void { }
    get nome() { return this.form.get('nome'); }
    get unidadeMedida() { return this.form.get('unidadeMedida'); }

    save() {

        let promisse: any;

        if (this.item.id) {
            promisse = this.itemService.put(this.item);
        } else {
            promisse = this.itemService.post(this.item);
        }

        promisse.then(data => this.router.navigate(['items']));
    }

    cancel() {
        this.gotoList();
    }

    gotoList() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }
}
