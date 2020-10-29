import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  isOpenNav = false;

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

  guiIdLenGiaoDien(id){
    this.router.navigate(['/user/create',id]);
  }

}
