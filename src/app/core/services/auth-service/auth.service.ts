import { Injectable } from '@angular/core'; // imports the class that provides local storage for token
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {}

  public login(loginInfo : object): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`,loginInfo)
  }

  public register(registerInfo : object): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/register`,registerInfo)
  }
}
