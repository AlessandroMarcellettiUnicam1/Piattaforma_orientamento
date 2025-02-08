

import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, toArray } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Sede } from 'src/app/interface/sede';
@Component({
  selector: 'app-Admin',
  templateUrl: './form.admin.component.html',
  styleUrls: ['./form.admin.component.css'],
})




export class AdminComponent implements OnInit {

  click = 1;
  anno: number = 0;
  constructor(private http: HttpClient) { }
  annoAccademicoInizio: number = 0;
  annoAccademicoFine: number = 0;
  private attivita: string = '';
  scuola: string = '';
  citta: string = '';
  cittaLista: string[] = [];
  dataInizio: Date = new Date();
  dataFine: Date = new Date();
  private tipo: string = ''
  items: string[] = [];
  scuole: string[] = [];
  professori: string[] = [];
  professoriUnicam: string[] = [];
  mostraCampoCitta: boolean = false;
  sede: string = '';
  selectedItem: string = '';
  descrizione: string = '';
  prof: string = '';
  profUnicam: string = '';
  private visualizzaAtt: string = '';
  annoAccademico: string = '';
  errorAttivita: boolean = false;
  errorSede: boolean = false;
  errorCitta: boolean = false;
  errorAnno: boolean = false;
  errorData: boolean = false;




  ngOnInit(): void {
    this.toggleDropdowAtt();
    this.toggleDropdownP();
    this.toggleDropdownC();
    this.toggleDropdownU();
    this.getYears();
  }

  onClick1() {
    this.click = 1;
  }
  onClick2() {
    this.click = 2;
  }

  inviaForm() {
    let error = false;
    if (this.checkAttivita()) {
      error = true;
    }
    if (this.checkSede()) {
      error = true;
    }
    if (this.checkCitta()) {
      error = true;
    }
    if (this.checkAnnoAccademico()) {
      error = true;
    }
    if (this.checkData()) {
      error = true;
    }
    if (!error) {
      this.onClick();
    }

  }

  checkAttivita() : boolean {
    if (this.attivita == '') {
      this.errorAttivita = true;
      return true;
    }
    this.errorAttivita = false;
    return false;
  }

  checkSede() : boolean {
    if (this.sede == '') {
      this.errorSede = true;
      return true;
    }
    this.errorSede = false;
    return false;
  }

  checkCitta() : boolean {
    if(this.citta!="" && this.scuole.length==0) {
      this.errorCitta = true;
      return true;
    }
    this.errorCitta = false;
    return false;
  }

  checkData() : boolean {
    let error = false;
    const annoI = this.dataInizio.getFullYear();
    const annoF = this.dataFine.getFullYear();
    const meseI = this.dataInizio.getMonth();
    const meseF = this.dataFine.getMonth();;
    const giornoI = this.dataInizio.getDay();
    const giornoF = this.dataFine.getDay();
    const oraI = this.dataInizio.getHours();
    const oraF = this.dataFine.getHours();
    if(annoI == this.annoAccademicoInizio && annoF == this.annoAccademicoInizio
      || annoI == this.annoAccademicoFine && annoF == this.annoAccademicoFine) {
      
        if(annoI>annoF) {
        this.errorData = true;
        error = true;
      } else if(meseI>meseF) {
        this.errorData = true;
        error = true;
      } else if(meseI==meseF && giornoI>giornoF) {
        this.errorData = true;
        error = true;
      } else if(giornoI==giornoF && oraI>oraF) {
        this.errorData = true;
        error = true;
      } else if(this.errorData) {
        this.errorData = false;
      }

    } else {
      this.errorData = true;
      error = true;
    }
    return error;
  }

  checkAnnoAccademico() : boolean {
    if(this.annoAccademico=="") {
      this.errorAnno = true;
    }
    this.errorAnno = false;
    return false;
  }

  onClick() {
    const nome: string = this.attivita;
    const tipo: string = this.tipo;
    const scuola: string = this.scuola;
    let sedeA: Sede = Sede.Online;
    const anno: number = this.anno = this.annoAccademicoInizio * 10000 + this.annoAccademicoFine;
    switch (this.sede) {
      case "Online":
        sedeA = Sede.Online;
        break;
      case "Università":
        sedeA = Sede.Università;
        break;
      case "Scuola":
        sedeA = Sede.Scuola;
        break;
      case "Altro":
        sedeA = Sede.Altro;
        break;
    }

    const nomeScuola: string = this.scuola;
    const cittaScuola: string = this.citta;
    const dataInizio = this.dataInizio;
    const dataFine = this.dataFine;
    const descrizione = this.descrizione;
    const profUnicam = this.selectedProf;
    const profReferente = this.prof;


    let body = { nome, tipo, scuola, anno, sedeA, dataInizio, dataFine, descrizione, profUnicam, profReferente };
    this.http
      .post<string>('http://localhost:8080/professori/createEmptyActivity1', body)
      .subscribe({
        next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
        error: (error) => console.log(error),
      });
  }

  cambioAttivita(event: any) {
    this.attivita = event.target.value;
  }
  cambioTipo(event: any) {
    this.tipo = event.target.value;
  }
  cambioCitta(event: any) {
    this.citta = event.target.value;
  }
  cambioDescrizione(event: any) {
    this.descrizione = event.target.value;
  }
  cambioProfRef(event: any) {
    this.prof = event.target.value;
  }
  cambioProfUni(event: any) {
    this.profUnicam = event.target.value;
  }

  toggleDropdowAtt() {
    let array = this.getPendingActivities();
    array.subscribe(
      (result: string[]) => {

        this.items = result; // Stampa i valori su console
      }
    );
  }

  toggleDropdownS() {
    let array = this.getScuole();
    array.subscribe(
      (result: string[]) => {

        this.scuole = result; // Stampa i valori su console
      }
    );
  }

  toggleDropdownP() {
    let array = this.getReferenti();
    array.subscribe(
      (result: string[]) => {

        this.professori = result; // Stampa i valori su console
      }
    );
  }

  toggleDropdownU() {
    let array = this.getProfUnicam();
    array.subscribe(
      (result: string[]) => {

        this.professoriUnicam = result; // Stampa i valori su console
      }
    );
  }

  toggleDropdownC() {
    let array = this.getCitta();
    var c = this.citta;

    array.subscribe((result: string[]) => {
      // Qui puoi utilizzare i valori emessi dall'Observable come un array di stringhe
      this.cittaLista = result; // Stampa i valori su console
    });
  }

  getCitta(): Observable<string[]> {
    return this.http
      .get<string[]>('http://localhost:8080/scuola/orderCitta')
      .pipe(
        map((response: any) => response.map((citta: any) => citta.toString()))
      );
  }

  getPendingActivities(): Observable<string[]> {

    return this.http.get<string[]>('http://localhost:8080/professori/getPendingActivities').pipe(
      map((response: any) => response.map((item: any) => item.toString()))
    );
    return this.http.get<string[]>('http://localhost:8080/professori/getPendingActivities');
  }


  getScuole(): Observable<string[]> {

    return this.http.get<string[]>('http://localhost:8080/scuola/scuoleCitta/' + this.citta).pipe(
      map((response: any) => response.map((scuola: any) => scuola.toString()))
    );
  }
  getReferenti(): Observable<string[]> {

    return this.http.get<string[]>('http://localhost:8080/professori/getReferenti').pipe(
      map((response: any) => response.map((prof: any) => prof.toString()))
    );
  }
  getProfUnicam(): Observable<string[]> {

    return this.http.get<string[]>('http://localhost:8080/professoriUnicam/getProfUnicam').pipe(
      map((response: any) => response.map((profUnicam: any) => profUnicam.toString()))
    );
  }

  handleButtonClick(): void {
    const nomeAttivitaAnno: string = this.visualizzaAtt;

    const nomeAttivita = nomeAttivitaAnno.substring(0, nomeAttivitaAnno.indexOf("4") - 1);
    const nome: string = this.visualizzaAtt;

    let body = { nome };
    if (nome != "") {
      this.http
        .post('http://localhost:8080/professori/uploadActivityDefinitively', body)
        .subscribe({
          next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
          error: (error) => console.log(error),
        });
    }
    else {
      alert("N.B:Tutti i campi devono essere riempiti");
    }
  }

  onSelectionChange(event: any) {
    this.prof = event.target.value;
  }
  onSelectionChangeS(event: any) {
    this.scuola = event.target.value;
  }
  onSelectionChangeAtt(event: any) {
    this.visualizzaAtt = event.target.value;
  }
  onSedeChange(event: Event): void {
    const selectedSede = (event.target as HTMLSelectElement).value;
    this.mostraCampoCitta = selectedSede === 'scuola';
  }
  onSelectionChangeY(event: any): void {
    this.annoAccademico = event.target.value;

    const [anno1, anno2] = this.annoAccademico.split('/');
    this.annoAccademicoInizio = parseInt(anno1, 10);
    this.annoAccademicoFine = parseInt(anno2, 10);
  }

  selectedProf: string[] = [];
  saveSelections() {
    this.selectedProf;
  }


  listaAnni: string[] = [];
  getYears(): void {
    let annoAttuale = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.listaAnni[i] = annoAttuale - 1 + '/' + annoAttuale--;
    }
  }

  public getAttivita(): string {
    return this.attivita;
  }
  public getCittaValue(): string {
    return this.citta;
  }
  public getListaCitta(): string[] {
    if(this.citta=="") {
      return this.cittaLista;
    }
    return this.cittaLista.filter(c => c.startsWith(this.citta.toUpperCase()));
  }
  public getScuola(): string {
    return this.scuola;
  }
  public getAnnoAccademico(): string {
    return this.annoAccademico;
  }

}




