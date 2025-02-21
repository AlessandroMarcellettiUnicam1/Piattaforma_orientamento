import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Universi } from '../interface/universi';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversiService {

  constructor(private http:HttpClient) { }


  getUniversi() :Observable<Universi[]>{
    return this.http.get<Universi[]>(environment.GET_LISTA_IMMATRICOLATI)
  }
}
