import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router } from "@angular/router"
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  public fg!: FormGroup;

  public roles: string[] = ['Admin', 'manager', 'HR', 'Developer'];

  public today = new Date();

  get nameField(): FormControl {
    return this.fg.get('name') as FormControl;
  }
  
  get dateOfBirthField(): FormControl {
    return this.fg.get('dateOfBirth') as FormControl;
  }
  
  get addressField(): FormControl {
    return this.fg.get('address') as FormControl;
  }
  
  get genderField(): FormControl {
    return this.fg.get('gender') as FormControl;
  }
  
  get roleField(): FormControl {
    return this.fg.get('role') as FormControl;
  }

  get phoneArray(): FormArray {
    // console.log(this.fg.get('phones'))
    return this.fg.get('phones') as FormArray;
  }

  getValidity(i: number) {
    return this.phoneArray.controls[i];
  }

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private readonly title: Title,
  ) { 
    this.title.setTitle(`Create New Employee`);
  }

  ngOnInit(): void {
    this._initForm();
    console.log(this.phoneArray.controls)
  }

  private _initForm(): void {
    this.fg = this._fb.group({
      id: [Date.now()],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(300)]],
      gender: ['m', [Validators.required]],
      role: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      phones: this._fb.array([])
    })
    this.addPhoneItem();
    console.log(this.phoneArray.invalid)
  }

  newPhoneFormItem(): FormGroup {
    return this._fb.group({
      phone: ['', { validators: [Validators.required, Validators.minLength(10)] }]
    });
  }

  public addPhoneItem(): void {
    this.phoneArray?.push(
      this.newPhoneFormItem()
    );
    console.log(this.fg.invalid)
  }

  public deletePhoneItem(index: number): void {
    this.phoneArray.removeAt(index);
  }

  public numbersOnly(event: any) {
    const input = String.fromCharCode(event.keyCode);
    if (!/^[0-9]*$/.test(input)) {
      event.preventDefault();
    }
  }

  public submitForm(): void {
    if (this.fg.valid) {
      this._empService.save(this.fg.value);
      this._snackBar.open('Employee was saved successfully', '', { duration: 2500});
      this._router.navigate(['/employee']);
    }
  }  

}
