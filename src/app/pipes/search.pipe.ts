import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPokemon'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchValue, selectedType): any {

    if (!searchValue && selectedType == "") return value;

    else {
      let result = [];
      value.forEach(v => {

        const type_num = v.types.length;

        if (selectedType == "") {
          if (v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
            result.push(v);
          }
        }

        else {

          if (type_num > 1) {

            if (v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
              && (v.types[0].type.name.toLowerCase() == selectedType.toLowerCase()
                || v.types[1].type.name.toLowerCase() == selectedType.toLowerCase())) {

              result.push(v);

            }

          }

          else {

            if (v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
              && (v.types[0].type.name.toLowerCase() == selectedType.toLowerCase())) {

              result.push(v);

            }
          }
        }

      });
      return result;
    }

  }

}
