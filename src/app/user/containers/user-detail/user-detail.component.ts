import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit ,OnChanges {

  constructor(private activatedRoute: ActivatedRoute) { }

  id: any;
  idChange: any;

  ngOnInit(): void {
    // this.id = this.activatedRoute.snapshot.params['idGiDo'];
    // console.log("id trong init: ",this.id);
    this.activatedRoute.params.subscribe(e=>{
      this.id = e['idGiDo'];
    })
    console.log("id trong init: ",this.id);

  }

  ngOnChanges(changes: SimpleChanges): void {  // ở đây không hoạt động
    // this.id = this.activatedRoute.snapshot.params['id'];

    this.activatedRoute.params.subscribe(e=>{
      this.idChange = e['idGiDo'];
    })
    console.log("id trong onChange: ",this.idChange);
  }

}
