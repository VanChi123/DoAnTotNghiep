import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) {
  }

  // lấy tất cả các quyền
  getAllRoles() {
    return this.httpClient
      .get<any>(`http://localhost:8081/role/get-all`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }
}
