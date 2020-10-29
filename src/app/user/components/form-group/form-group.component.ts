import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  profileForm = new FormGroup({
    firstName: new FormControl('',[Validators.required,Validators.minLength(2)]),
    lastName: new FormControl('',Validators.required),
  });
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

}
