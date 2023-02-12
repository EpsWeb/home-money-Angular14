import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wfmFilter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string, field: 'amount' | 'date' | 'category' | 'type'): unknown {
    if (items.length === 0 || !value) {
      return items
    }

    return items.filter(i => {

      const t = Object.assign({}, i)

      if (field === 'type') {
        t[field] = t[field] === 'income' ? 'Доход' : 'Расход'
      }

      if (field === 'category') {
        t[field] = t.catName
      }

      return t[field].toString().toLowerCase().includes(value.toString().toLowerCase())
    })
  }

}
