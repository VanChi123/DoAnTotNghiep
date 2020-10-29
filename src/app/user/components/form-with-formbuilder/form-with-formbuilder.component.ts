import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-with-formbuilder',
  templateUrl: './form-with-formbuilder.component.html',
  styleUrls: ['./form-with-formbuilder.component.scss']
})
export class FormWithFormbuilderComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  profileForm = this.fb.group({
    firstName: ['',[Validators.required,Validators.minLength(2)]],
    lastName: ['',[Validators.required,Validators.minLength(5)]],
    address: this.fb.group({
      street: ['',Validators.compose([Validators.required,Validators.minLength(4)])], //phải có compose nếu không sẽ lỗi validator must Promise ...( hình như chỉ có vali thằng con mới bị thôi)
      city: [''],
      state: [''],
      zip: ['',[Validators.required,Validators.minLength(2)]] //sẽ bị lỗi nhé
    }),
  });
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }
}
