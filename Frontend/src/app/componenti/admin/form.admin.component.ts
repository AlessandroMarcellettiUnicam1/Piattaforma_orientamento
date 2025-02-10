

import { HttpClient } from '@angular/common/http';
import { ResService } from 'src/app/service/res.service';
import { ActivityAvailable } from 'src/app/interface/activityAvailable';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sede } from 'src/app/interface/sede';

@Component({
  selector: 'app-Admin',
  templateUrl: './form.admin.component.html',
  styleUrls: ['./form.admin.component.css'],
})

export class AdminComponent implements OnInit {
  constructor(private http: HttpClient,
    private resService: ResService,
  ) { }

  click = 1;
  anno: number = 0;
  activities: ActivityAvailable[] = [];
  annoAccademicoInizio: number = 0;
  annoAccademicoFine: number = 0;
  private attivita: string = '';
  scuola: string = '';
  citta: string = '';
  cittaLista: string[] = [];
  dataInizio: Date = new Date();
  dataFine: Date = new Date();
  dataI: Date = new Date();
  dataF: Date = new Date();
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
  annoAccademico: string = '';
  errorAttivita: boolean = false;
  errorSede: boolean = false;
  errorCitta: boolean = false;
  errorAnno: boolean = false;
  errorData: boolean = false;
  errorProfRef: boolean = false;
  errorProfUnicam: boolean = false;




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
    this.toggleDropdowAtt();
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
    if (this.checkProfRef()) {
      error = true;
    }
    if (this.checkProfUnicam()) {
      error = true;
    }
    if (!error) {
      this.onClick();
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

  checkSede(): boolean {
    if (this.sede == '') {
      this.errorSede = true;
      return true;
    }
    this.errorSede = false;
    return false;
  }

  checkCitta(): boolean {
    if (this.citta != '' && this.scuole.length == 0) {
      this.errorCitta = true;
      return true;
    }
    this.errorCitta = false;
    return false;
  }

  checkData(): boolean {
    let error = false;
    const annoI = parseInt(this.dataI.toString().slice(0, 4));
    const annoF = parseInt(this.dataF.toString().slice(0, 4));
    const meseI = parseInt(this.dataI.toString().slice(5, 7));
    const meseF = parseInt(this.dataF.toString().slice(5, 7));
    const giornoI = parseInt(this.dataI.toString().slice(8, 10));
    const giornoF = parseInt(this.dataF.toString().slice(8, 10));
    const oraI = parseInt(this.dataI.toString().slice(11, 13));
    const oraF = parseInt(this.dataF.toString().slice(11, 13));

    console.log(this.dataI.toString().slice(0, 4) + ", " + this.dataI.toString().slice(5, 7) + ", " + this.dataI.toString().slice(8, 10) + ", " + this.dataI.toString().slice(11, 13));

    if (annoI == this.annoAccademicoInizio && annoF == this.annoAccademicoInizio
      || annoI == this.annoAccademicoFine && annoF == this.annoAccademicoFine) {

      if (annoI > annoF) {
        this.errorData = true;
        error = true;
      } else if (meseI > meseF) {
        this.errorData = true;
        error = true;
      } else if (meseI == meseF && giornoI > giornoF) {
        this.errorData = true;
        error = true;
      } else if (giornoI == giornoF && oraI > oraF) {
        this.errorData = true;
        error = true;
      } else if (this.errorData) {
        this.errorData = false;
      }

    } else {
      this.errorData = true;
      error = true;
    }
    return error;
  }

  checkAnnoAccademico(): boolean {
    if (this.annoAccademico == '') {
      this.errorAnno = true;
      return true;
    }
    this.errorAnno = false;
    return false;
  }

  checkProfRef(): boolean {
    if (this.prof == '') {
      this.errorProfRef = true;
      return true;
    }
    this.errorProfRef = false;
    return false;
  }

  checkProfUnicam(): boolean {
    if (this.profUnicam == '') {
      this.errorProfUnicam = true;
      return true;
    }
    this.errorProfUnicam = false;
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

    const dataInizio = this.dataInizio;
    const dataFine = this.dataFine;
    const descrizione = this.descrizione;
    const profUnicam = this.profUnicam;
    const profReferente = this.prof;

    console.log("Nome:" + nome + "\nTipo:" + tipo + "\nScuola:" + scuola + "\nAnno:" + anno + "\nSede:" + this.sede + "\nDataInizio:" + dataInizio + "\nDataFine:" + dataFine + "\nDescrizione:" + descrizione + "\nProfUnicam:" + profUnicam + "\nProfReferente:" + profReferente)

    let body = { nome, tipo, scuola, anno, sedeA, dataInizio, dataFine, descrizione, profUnicam, profReferente };
    this.http
      .post<string>('http://localhost:8080/professori/createEmptyActivity1', body)
      .subscribe({
        next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
        error: (error) => console.log(error),
      });
  }

  handleButtonClick(nome: string, anno: number): void {

    let body = { nome, anno };
    this.http
      .post('http://localhost:8080/professori/uploadActivityDefinitively', body)
      .subscribe({
        next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
        error: (error) => console.log(error),
      });
    this.onClick2();
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
  cambioScuola(event: any) {
    this.scuola = event.target.value;
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

  toggleDropdowAtt() {
    this.resService.getResAttActive().subscribe({
      next: (response) => (this.activities = response),
      error: (error) => console.log(error),
    });
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

  listaAnni: string[] = [];
  getYears(): void {
    let annoAttuale = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.listaAnni[i] = annoAttuale - 1 + '/' + annoAttuale--;
    }
  }

  creaStringaAnnoAcc(a: number) {
    let aI = Math.floor(a / 10000);
    let aF = a % 10000
    let ain = (aI % 100);
    let afin = (aF % 100);

    return ain + '/' + afin;
  }

  public getAttivita(): string {
    return this.attivita;
  }
  public getCittaValue(): string {
    return this.citta;
  }
  public getListaCitta(): string[] {
    if (this.citta == '') {
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




