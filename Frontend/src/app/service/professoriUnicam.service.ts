import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfessoriUnicam } from '../interface/professoriUnicam';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfessoriUnicamService {

  constructor(private http : HttpClient) { }


  getProfessori() : Observable<ProfessoriUnicam[]>{
    return this.http.get<ProfessoriUnicam[]>(environment.GET_PROFESSORI_UNICAM);
  }
}