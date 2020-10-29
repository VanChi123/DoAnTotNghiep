import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {forbiddenNameValidator} from "../../../shared/directives/forbidden-name.directive";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  constructor() { }

  @Input() title: string;
  name = new FormControl('',[
    Validators.required,
    Validators.minLength(4),
   forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
  ]);

  age: FormControl;
  ngOnInit(): void {
    this.name.setValue("Bùi Văn Chí"); //set value sẽ báo lỗi nếu bất kì thuộc tính nào trong form bị thiếu dl truyeenf vào
                                            //nếu patch value thì ok

    this.age = new FormControl(''); //nếu validator bên này ko có mà bên kia có cững được

    // this.name.valueChanges.subscribe(e=>{     //đưa thawngfn ày vào đây và ko cần sự kiện change hay ngModelOnchange của ô input nữa
    //   console.log(e);
    // })
  }

  xuLyDuLieu(){
    alert('chũ là : '+this.name.value); //lấy dữ liệu từ form control
  }

  //có 3 cách khởi tạo form : lúc khai báo/ constructor/ngOnInit()
// - ngonInit:
//     this.form.valueChanges.subcribe(e=>console.log)
//   html: {{form.value|json}}
// <mat-form-field>
// </>
// https://www.youtube.com/watch?v=JeeUY6WaXiA   //reactive form trong angular
  //novalidate trong thẻ form để bỏ sự kiện vali của html 5 ?

  //thẻ fildeset ?


  changeValue(){
    // this.name.valueChanges.subscribe(e=>{
    //   console.log(e);
    // })
    console.log(this.name.value);
  }
}
