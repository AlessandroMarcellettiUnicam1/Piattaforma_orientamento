import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Res } from '../interface/res';

@Injectable({
  providedIn: 'root'
})
export class ResService {

  constructor(private http: HttpClient) { }


  getRes() : Observable<Res[]>{
    return this.http.get<Res[]>('http://localhost:8080/risultati/res')
  }


  getResAnno(a:number): Observable<Res[]>{
    return this.http.get<Res[]>('http://localhost:8080/risultati/res/'+a)
  }
}
