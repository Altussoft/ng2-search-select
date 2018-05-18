import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ng2Ss'
})
export class Ng2SsPipe implements PipeTransform {

  transform(items: any[], search: string): any {
    if(!search) {
      return items;
    }
    let newArr = [];
    for(let i=0;i<items.length;i++) {
      if(items[i].label.toLowerCase().indexOf(search.toLowerCase()) > -1) {
        newArr.push(items[i]);
      }
    }
    return newArr.length > 0 ? newArr : [-1];
  }

}
