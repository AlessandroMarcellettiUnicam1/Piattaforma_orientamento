import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfessoriUnicam } from '../interface/professoriUnicam';

@Injectable({
  providedIn: 'root'
})
export class ProfessoriUnicamService {

  constructor(private http : HttpClient) { }


  getProfessori() : Observable<ProfessoriUnicam[]>{
    return this.http.get<ProfessoriUnicam[]>('http://localhost:8080/professoriUnicam/get');
  }
}