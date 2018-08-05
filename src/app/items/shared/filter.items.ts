import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'filterItems' })
export class FilterItems implements PipeTransform {

transform(items: any[], searchToken: string) {
        if (searchToken == null) {
            searchToken = '';
        }
        searchToken = searchToken.toLowerCase();
        return items.filter(elem => elem.name.toLowerCase().indexOf(searchToken) > -1);
    }
}
