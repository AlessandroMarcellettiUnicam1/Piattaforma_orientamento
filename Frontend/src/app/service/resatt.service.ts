import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Risatt } from '../interface/risatt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResattService {

  constructor(private http :HttpClient) { }

  getRes() :Observable<Risatt[]>{
    return this.http.get<Risatt[]>(environment.GET_RISULTATI_ATT)
  }

}
