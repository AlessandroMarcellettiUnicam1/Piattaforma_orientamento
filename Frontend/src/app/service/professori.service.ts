import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professori } from '../interface/professori';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfessoriService {

  constructor(private http : HttpClient) { }


  getProfessori() : Observable<Professori[]>{
    return this.http.get<Professori[]>(environment.GET_PROFESSORI);
  }
}
