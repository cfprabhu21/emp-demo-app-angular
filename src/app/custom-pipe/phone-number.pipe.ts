import { Pipe, PipeTransform } from '@angular/core';
import { Phone } from '../employee/models/iemployee';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: Phone[], ...args: unknown[]): string {
    let pn: string[] = [];
    value.map(obj => {
      pn.push(obj.phone)
    })
    return pn.join(', ');
  }

}
