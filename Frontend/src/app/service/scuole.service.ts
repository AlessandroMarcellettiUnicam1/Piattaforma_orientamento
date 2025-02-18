import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scuola } from '../interface/scuola';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScuoleService {

  constructor(private http: HttpClient) { }

  getScuole() : Observable<Scuola[]>{
    return this.http.get<Scuola[]>(environment.GET_LISTA_SCUOLE)
  }
}
