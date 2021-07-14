import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeFilter'
})
export class TypeFilterPipe implements PipeTransform {
  transform(value: any, filters?: any): any {
    if (!value) {
      return;
    }
    if (!filters) {
      return value;
    }
    filters = filters.toLowerCase();

    return value.filter(pokemon => {
      let matchFound = false;

      if (pokemon.details && pokemon.details.types) {
        matchFound = JSON.stringify(pokemon.details.types)
          .toLowerCase()
          .includes(filters);
      }
      return matchFound;
    });
  }
}
