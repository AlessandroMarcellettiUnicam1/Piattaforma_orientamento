import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Universi } from '../interface/universi';

@Injectable({
  providedIn: 'root'
})
export class UniversiService {

  constructor(private http:HttpClient) { }


  getUniversi() :Observable<Universi[]>{
    return this.http.get<Universi[]>('http://localhost:8080/universitari/geta')
  }
}
