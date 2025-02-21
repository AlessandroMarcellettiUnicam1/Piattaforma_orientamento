import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivityAvailable } from 'src/app/interface/activityAvailable';
import { ResService } from 'src/app/service/res.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})

export class FormdatComponent implements OnInit {

  constructor(private http: HttpClient,
    private resService: ResService
  ) {}
  listaAttivita: string[] = [];
  attivita: string = '';
  nome: string = '';
  cognome: string = '';
  email: string = '';
  listaCitta: string[] = [];
  citta: string = '';
  listaScuole: string[] = [];
  scuola: string = '';
  errorAttivita: boolean = false;
  errorNome: boolean = false;
  errorCognome: boolean = false;
  errorEmail: boolean = false;
  errorCitta: boolean = false;
  errorScuola: boolean = false;

  ngOnInit(): void {
    this.toggleDropdownAtt();
    this.toggleDropdownC();
  }

  toggleDropdownAtt() {
    let array = this.resService.getAttActive();
    array.subscribe(
      (result: ActivityAvailable[]) => {
        result.forEach(a => this.listaAttivita.push(a.nome+'%'+a.annoAcc));
      }
    );
  }

  toggleDropdownC() {
    let array = this.getCitta();
    array.subscribe((result: string[]) => {
      // Qui puoi utilizzare i valori emessi dall'Observable come un array di stringhe
      this.listaCitta = result; // Stampa i valori su console
    });
  }

  toggleDropdownS() {
    let array = this.getScuole();
    array.subscribe(
      (result: string[]) => {

        this.listaScuole = result;
      }
    );
  }

  getCitta(): Observable<string[]> {
    return this.http
      .get<string[]>(environment.GET_LISTA_CITTA)
      .pipe(
        map((response: any) => response.map((citta: any) => citta.toString()))
      );
  }

  getScuole(): Observable<string[]> {
    return this.http.get<string[]>(environment.GET_LISTA_SCUOLE_DA_CITTA + this.citta).pipe(
      map((response: any) => response.map((scuola: any) => scuola.toString()))
    );
  }

  inviaIscrizione(): void {
    const nomeAttivita: string = this.attivita.slice(0, this.attivita.indexOf('%'));
    const anno: number =  parseInt(this.attivita.slice(this.attivita.indexOf('%')+1, this.attivita.length));
    const nome: string = this.nome;
    const cognome: string = this.cognome;
    const email: string = this.email;
    const scuola: string = this.scuola;

    let body = { nome, cognome, email, nomeAttivita, anno, scuola };

    this.http
        .post(environment.POST_ISCRIZIONE_STUDENTE, body)
        .subscribe({
          next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
          error: (error) => console.log(error),
        });

  }

  checkInvioIscrizione() {
    let error = false;
    if(this.checkAttivita()) {
      error = true;
    }
    if(this.checkNome()) {
      error = true;
    }
    if(this.checkCognome()) {
      error = true;
    }
    if(this.checkEmail()) {
      error = true;
    }
    if(this.checkCitta()) {
      error = true;
    }
    if(this.checkScuola()) {
      error = true;
    }
    if(!error) {
      this.inviaIscrizione();
    }
  }

  checkAttivita(): boolean {
    if (this.attivita == '') {
      this.errorAttivita = true;
      return true;
    }
    this.errorAttivita = false;
    return false;
  }

  checkNome(): boolean {
    if (this.nome == '') {
      this.errorNome = true;
      return true;
    }
    this.errorNome = false;
    return false;
  }

  checkCognome(): boolean {
    if (this.cognome == '') {
      this.errorCognome = true;
      return true;
    }
    this.errorCognome = false;
    return false;
  }

  checkEmail(): boolean {
    if (this.email == '') {
      this.errorEmail = true;
      return true;
    }
    this.errorEmail = false;
    return false;
  }

  checkCitta(): boolean {
    if (this.citta == '' || this.listaScuole.length == 0) {
      this.errorCitta = true;
      return true;
    }
    this.errorCitta = false;
    return false;
  }

  checkScuola(): boolean {
    if (this.scuola == '') {
      this.errorScuola = true;
      return true;
    }
    this.errorScuola = false;
    return false;
  }
  
  public getListaCitta(): string[] {
    if (this.citta == '') {
      return this.listaCitta;
    }
    return this.listaCitta.filter(c => c.startsWith(this.citta.toUpperCase()));
  }

  cambioAttivita(event: any) {
    this.attivita = event.target.value;
  }
  cambioNome(event: any) {
    this.nome = event.target.value;
  }
  cambioCognome(event: any) {
    this.cognome = event.target.value;
  }
  cambioEmail(event: any) {
    this.email = event.target.value;
  }
  cambioCitta(event: any) {
    this.citta = event.target.value;
  }
  cambioScuola(event: any) {
    this.scuola = event.target.value;
  }

}