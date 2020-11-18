import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router) { }

  // mở tìm kiếm
  showSearch = false;

  // form tìm kiếm
  formSearch: FormGroup;

  ngOnInit(): void {
    this.buildFormSearch();

  }

  private buildFormSearch() {
    this.formSearch = this.fb.group({
      templateType: [''], // loại tài liệu
      fileType: [''], // loại hồ sơ
      status: [''], // trạng thái xử lý,

      field: [''], // lĩnh vực
      templateClass: [''], // phân loại mẫu
      templateSign: [''], // ký hiệu mẫu,
    });
  }

  // when click search advance
  onSearch() {
    // this.searchTemplates.emit(this.formSearch.value);
  }

}
