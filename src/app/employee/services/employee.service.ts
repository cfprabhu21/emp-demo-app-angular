import { Injectable } from '@angular/core';
import { Iemployee } from '../models/iemployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  save(empData: Iemployee): void {
    const empList = this.getAllEmployees();
    empList.push(empData);
    localStorage.setItem('empList', JSON.stringify(empList));
  }

  getAllEmployees(): Iemployee[] {
    const empList = JSON.parse(localStorage.getItem('empList') || '[]');
    return empList;
  }
}
