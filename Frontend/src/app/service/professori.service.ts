import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professori } from '../interface/professori';

@Injectable({
  providedIn: 'root'
})
export class ProfessoriService {

  constructor(private http : HttpClient) { }


  getProfessori() : Observable<Professori[]>{
    return this.http.get<Professori[]>('http://localhost:8080/professori/get');
  }
}
