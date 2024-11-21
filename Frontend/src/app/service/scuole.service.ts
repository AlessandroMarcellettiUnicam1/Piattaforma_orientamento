import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scuola } from '../interface/scuola';

@Injectable({
  providedIn: 'root'
})
export class ScuoleService {

  constructor(private http: HttpClient) { }



  getScuole() : Observable<Scuola[]>{
    return this.http.get<Scuola[]>('http://localhost:8080/scuola/visua')
  }
}
