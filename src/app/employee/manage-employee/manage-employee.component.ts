import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Iemployee } from '../models/iemployee';
import { EmployeeService } from '../services/employee.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'gender', 'dateOfBirth', 'address', 'action'];
  dataSource = new MatTableDataSource<Iemployee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _empService: EmployeeService,
    private readonly title: Title,
  ) {
    this.title.setTitle(`Manage Employee`)
  }

  ngOnInit(): void {
    console.log(this._empService.getAllEmployees());
    this.dataSource.data = this._empService.getAllEmployees();
    console.log(this.dataSource.data)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number): void {
    const index = this.dataSource.data.findIndex(emp => emp.id == id);
    const data = [...this.dataSource.data];
    data.splice(index, 1);
    this.dataSource.data = data;
    localStorage.setItem('empList', JSON.stringify(data));
  };

}
