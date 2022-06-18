import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
  domain = " http://localhost:8080";
  constructor(private http: HttpClient) { 
 }

  registerUser(user:any)
{
return this.http.post<any>(this.domain + '/authentication/register',user).pipe(map((res:any)=>
{
  return res;
}))
}
}
