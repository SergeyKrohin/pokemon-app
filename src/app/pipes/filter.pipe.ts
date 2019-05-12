import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {
	
    transform(items, term, propName): any {
        
		if(typeof term === 'undefined' || typeof propName === 'undefined') {
			return items;
		}
		
        return items.filter(item => {
			return item[propName].toLowerCase().includes(term.toLowerCase());
		});
    }
	
}