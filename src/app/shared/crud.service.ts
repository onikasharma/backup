
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';

export class user {
  "name" : string;
  "id":string;
  "phone":string;
  "email": string
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //Restful API

  endPoint = 'http://localhost:3000';

  constructor( private http : HttpClient) { }

  httpHeader ={
    headers : new HttpHeaders ({
      'Content-Type': 'application/json'
    })
  }

  getUsers(id): Observable<User> {
    return this.http.get<user>(this.endPoint + '/users')
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  getSingleUser(id) : Observable<user> {
    return this.http.get <user>(this.endPoint + '/Users').pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  addUser(data): Observable<user> {
    return this.http.post<user>(this.endPoint + '/users', JSON.stringify(data), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  updateUsers(id,data) : Observable<user>{
    return this.http.put<user>(this.endPoint + "/Users/" + id , JSON.stringify(data), this.httpHeader).pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  deleteuser(id):Observable<user> {
    return this.http.get<user>(this.endPoint + "/Users/"+ id, this.httpHeader).pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  processError(err){
    let message = "";
    if (err.error instanceof ErrorEvent){
      message = err.error.message
      
    }else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message)


  }
}
