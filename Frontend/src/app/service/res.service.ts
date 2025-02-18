import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Res } from '../interface/res';
import { ActivityAvailable } from '../interface/activityAvailable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResService {

  constructor(private http: HttpClient) { }


  getRes() : Observable<Res[]>{
    return this.http.get<Res[]>(environment.GET_RES_RISULTATI)
  }


  getResAnno(a:number): Observable<Res[]>{
    return this.http.get<Res[]>(environment.GET_RES_RISULTATI_DA_ANNO+a)
  }

  getAttActive() : Observable<ActivityAvailable[]>{
    return this.http.get<ActivityAvailable[]>(environment.GET_RISULTATI_ATT);
  }
}
