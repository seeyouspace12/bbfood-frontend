// import { Injectable } from '@angular/core'; // imports the class that provides local storage for token
// import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { catchError } from "rxjs/operators";
// import { throwError } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })

// export class AuthService implements HttpInterceptor {
//
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     console.log("Interception In Progress"); // Interception Stage
//     const token = localStorage.getItem('token'); // This retrieves a token from local storage
//     req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });// This clones HttpRequest and Authorization header with Bearer token added
//     req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
//     req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
//
//     return next.handle(req)
//       .pipe(
//         catchError((error: HttpErrorResponse) => {
//           // Catching Error Stage
//           if (error && error.status === 401) {
//             console.log("ERROR 401 UNAUTHORIZED") // in case of an error response the error message is displayed
//           }
//           const err = error.error.message || error.statusText;
//           return throwError(error); // any further errors are returned to frontend
//         })
//       );
//   }
// }
//
//
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import {User} from "../../../shared/interfaces/user";
// import {shareReplay} from "rxjs/operators";
//
//
//
// @Injectable()
// export class AuthService {
//
//   constructor(private http: HttpClient) {
//   }
//
//   login(email:string, password:string) {
//     return this.http.post<User>('/login', {email, password}).pipe(shareReplay());
//   }
// }





// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import {User} from "../../../shared/interfaces/user";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private http : HttpClient) { }
//
//   public isAuthenticated() : Boolean {
//     let userData = localStorage.getItem('userInfo')
//     if(userData && JSON.parse(userData)){
//       return true;
//     }
//     return false;
//   }
//
//   public setUserInfo(user : User){
//     localStorage.setItem('userInfo', JSON.stringify(user));
//   }
//
//   public validate(email : string, password : string) {
//     return this.http.post('/api/authenticate', {'username' : email, 'password' : password}).toPromise()
//   }
//}
