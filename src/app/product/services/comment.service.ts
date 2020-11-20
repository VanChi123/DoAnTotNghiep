import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  addComment(body: any) {
    const payload = body;

    return this.httpClient
      .post<any>(`http://localhost:8081/comment/add`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }
}
