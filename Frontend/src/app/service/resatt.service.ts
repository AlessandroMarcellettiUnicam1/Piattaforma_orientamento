import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Risatt } from '../interface/risatt';

@Injectable({
  providedIn: 'root'
})
export class ResattService {

  constructor(private http :HttpClient) { }

  getRes() :Observable<Risatt[]>{
    return this.http.get<Risatt[]>('http://localhost:8080/risultati/resa')
  }

}
