import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Anni } from 'src/app/interface/anni';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-uploadat',
  templateUrl: './uploadat.component.html',
  styleUrls: ['./uploadat.component.css'],
})

export class UploadatComponent implements OnInit {
  private tipo: string = '';
  visualizza: string = 'ATT';
  private nome: string = '';
  private data = new FormData();
  private dataIscr = new FormData();
  private dataProf = new FormData();
  private dataProfUnicam = new FormData();
  constructor(private http: HttpClient) {}
  private anno = 0;
  anni: Anni[] = [];
  annoAccademicoInizio: number = 0;
  annoAccademicoFine: number = 0;
  private cognome: string = '';
  private email: string = '';
  cittaLista: string[] = [];
  citta: string = '';
  scuole: string[] = [];
  private attivita: string = '';
  scuola: string = '';
  sede: string = '';
  mostraCampoCitta: boolean = false;
  dataInizio: string = '';
  dataFine: string = '';
  descrizione: string = '';
  professori: string[] = [];
  professoriUnicam: string[] = [];
  prof: string = '';
  profUnicam: string = '';
  annoAccademico: string = '';
  file: File | null = null;
  errorAttivita: boolean = false;
  errorSede: boolean = false;
  errorAnno: boolean = false;
  errorData: boolean = false;
  errorCognome: boolean = false;
  errorNome: boolean = false;
  errorEmail: boolean = false;
  errorCitta: boolean = false;

  ngOnInit(): void {
    this.setAnni();
    this.toggleDropdownP();
    this.toggleDropdownC();
    this.toggleDropdownU();
    this.getYears();
  }

  cambioDescrizione(event: any) {
    this.descrizione = event.target.value;
  }
  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.data.append('file', file);
      this.file = file;
    }
  }
  onChangeFileIscr(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
      this.dataIscr.append('file', file);
    }
  }
  onChangeFileProf(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.dataProf.append('file', file);
    }
  }
  onChangeFileProfUnicam(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.dataProfUnicam.append('file', file);
    }
  }
  onSedeChange(event: Event): void {
    const selectedSede = (event.target as HTMLSelectElement).value;
    this.mostraCampoCitta = selectedSede === 'scuola';
  }
  onSelectionChange(event: any) {
    this.toggleDropdownP();
    this.prof = event.target.value;
  }

  onClickIscr() {
    let anno = this.annoAccademicoInizio * 10000 + this.annoAccademicoFine;
    this.http
      .post(
        environment.POST_CARICA_IMMATRICOLATI + '' + anno,
        this.dataIscr
      )
      .subscribe({
        next: (response) =>
          console.log(alert('inserimento avvenuto con successo'), response),
        error: (error) => console.log(error),
      });
  }

  onClick() {

    const anno: number = (this.anno =
      this.annoAccademicoInizio * 10000 + this.annoAccademicoFine);

    let param;
    if (this.scuola == '') {
      param =
        this.attivita +
        '&' +
        this.tipo +
        '$' +
        this.sede +
        '£' +
        this.dataInizio.toString() +
        ' ' +
        this.dataFine.toString() +
        ' ' +
        this.descrizione +
        '+' +
        this.profUnicam +
        ',+' +
        this.prof +
        '-' +
        anno.toString();
    } else {
      param =
        this.attivita +
        '&' +
        this.tipo +
        '$' +
        this.scuola.toString() +
        '£' +
        this.citta.toString() +
        '£' +
        this.sede +
        '*' +
        this.dataInizio.toString() +
        ' ' +
        this.dataFine.toString() +
        ' ' +
        this.descrizione +
        '+' +
        this.profUnicam +
        ',+' +
        this.prof +
        '-' +
        anno.toString();
    }

    this.http
      .post(
        environment.POST_CARICA_ATTIVITA + '' + param,
        this.data
      )
      .subscribe({
        next: (response) =>
          console.log(alert('inserimento avvenuto con successo'), response),
        error: (error) => console.log(error),
      });
  }

  onclickProf() {
    this.http
      .post(environment.POST_CARICA_FILE_PROFESSORI_REFERENTI, this.dataProf)
      .subscribe({
        next: (response) =>
          console.log(alert('inserimento avvenuto con successo'), response),
        error: (error) => console.log(error),
      });
  }

  onclickProfUnicam() {
    this.http
      .post(
        environment.POST_CARICA_FILE_PROFESSORI_UNICAM,
        this.dataProfUnicam
      )
      .subscribe({
        next: (response) =>
          console.log(alert('inserimento avvenuto con successo'), response),
        error: (error) => console.log(error),
      });
  }

  cambio(event: any) {
    this.nome = event.target.value;
  }

  cambioSel(e: any) {
    this.visualizza = e;
  }

  setAnni() {
    let date = new Date();
    this.anno = date.getFullYear() * 2 + 1;
    for (let i = this.anno - 4; i <= this.anno; i++) {
      let app = (i - 1) / 2;
      let inizio: string = app.toString().substring(2, 4);
      let fin = app + 1;
      let fine: string = fin.toString().substring(2, 4);
      let annoVis = inizio + '/' + fine;
      let a: Anni = { value: i, viewValue: annoVis };
      this.anni.push(a);
      i++;
    }
  }

  cambioAnno(e: any) {
    this.anno = e;
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
  cambioProfRef(event: any) {
    this.prof = event.target.value;
  }
  cambioProfUni(event: any) {
    this.profUnicam = event.target.value;
  }
  cambioAttivita(event: any) {
    this.attivita = event.target.value;
  }
  cambioTipo(event: any) {
    this.tipo = event.target.value;
  }
  submitAttForm() {
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

  submitIscrForm() {
    if (!this.checkAnnoAccademico) {
      this.onClickIscr();
    }
  }

  submitSingleProf() {
    if (!this.checkNomeCognome()) {
      this.onclickSingleProf();
    }
  }

  submitSingleProfUnicam() {
    let error = false;
    if (this.checkNomeCognome()) {
      error = true;
    }
    if (this.checkEmail()) {
      error = true;
    }
    if (!error) {
      this.onclickSingleProfUnicam();
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
    const annoI = parseInt(this.dataInizio.slice(0, 4));
    const annoF = parseInt(this.dataFine.slice(0, 4));
    const meseI = parseInt(this.dataInizio.slice(5, 7));
    const meseF = parseInt(this.dataFine.slice(5, 7));
    const giornoI = parseInt(this.dataInizio.slice(8, 10));
    const giornoF = parseInt(this.dataFine.slice(8, 10));
    const oraI = parseInt(this.dataInizio.slice(11, 13));
    const oraF = parseInt(this.dataFine.slice(11, 13));
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

  checkNomeCognome(): boolean {
    let error = false;
    if (this.cognome == '') {
      this.errorCognome = true;
      error = true;
    } else {
      this.errorCognome = false;
    }
    if (this.nome == '') {
      this.errorNome = true;
      error = true;
    } else {
      this.errorNome = false;
    }
    return error;
  }

  checkEmail(): boolean {
    if (this.email == '') {
      this.errorEmail = true;
      return true;
    }
    this.errorEmail = false;
    return false;
  }

  listaAnni: string[] = [];
  getYears(): void {
    let annoAttuale = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.listaAnni[i] = annoAttuale - 1 + '/' + annoAttuale--;
    }
  }

  onSelectionChangeY(event: any): void {
    this.annoAccademico = event.target.value;

    const [anno1, anno2] = this.annoAccademico.split('/');
    this.annoAccademicoInizio = parseInt(anno1, 10);
    this.annoAccademicoFine = parseInt(anno2, 10);
  }

  toggleDropdownS() {
    let array = this.getScuole();
    array.subscribe(
      (result: string[]) => {
        // Qui puoi utilizzare i valori emessi dall'Observable come un array di stringhe
        this.scuole = result;
        if (this.scuole.length == 0) {
          this.scuola = '';
        }
      }
    );
  }

  getScuole(): Observable<string[]> {
    return this.http
      .get<string[]>(environment.GET_LISTA_SCUOLE_DA_CITTA + this.citta)
      .pipe(
        map((response: any) => response.map((scuola: any) => scuola.toString()))
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
      .get<string[]>(environment.GET_LISTA_CITTA)
      .pipe(
        map((response: any) => response.map((citta: any) => citta.toString()))
      );
  }

  onSelectionChangeS(event: any) {
    this.scuola = event.target.value;
  }

  onclickSingleProf(): void {
    const nome: string = this.nome;
    const cognome: string = this.cognome;
    const email: string = this.email;
    const attivita: string = this.attivita;

    const scuola = this.scuola;
    const citta = this.citta;

    let body = { email, nome, cognome, scuola, citta, attivita };

    if (
      nome != '' &&
      cognome != '' &&
      email != '' &&
      attivita != '' &&
      scuola != ''
    ) {
      this.http
        .post(environment.POST_CARICA_PROFESSORE_REFERENTE, body)
        .subscribe({
          next: (response) =>
            console.log(alert('inserimento avvenuto con successo'), response),
          error: (error) => console.log(error),
        });
    } else {
      alert('N.B:Tutti i campi devono essere riempiti');
    }
  }

  onclickSingleProfUnicam(): void {
    const nome: string = this.nome;
    const cognome: string = this.cognome;
    const email: string = this.email;

    let body = { email, nome, cognome };

    if (nome != '' && cognome != '' && email != '') {
      this.http
        .post(environment.POST_CARICA_FILE_PROFESSORI_UNICAM, body)
        .subscribe({
          next: (response) =>
            console.log(alert('inserimento avvenuto con successo'), response),
          error: (error) => console.log(error),
        });
    } else {
      alert('N.B:Tutti i campi devono essere riempiti');
    }
  }

  toggleDropdownP() {
    let array = this.getReferenti();
    array.subscribe((result: string[]) => {
      // Qui puoi utilizzare i valori emessi dall'Observable come un array di stringhe
      this.professori = result; // Stampa i valori su console
    });
  }

  getReferenti(): Observable<string[]> {
    return this.http
      .get<string[]>(environment.GET_LISTA_PROFESSORI_REFERENTI)
      .pipe(
        map((response: any) => response.map((prof: any) => prof.toString()))
      );
  }

  toggleDropdownU() {
    let array = this.getProfUnicam();
    array.subscribe((result: string[]) => {
      // Qui puoi utilizzare i valori emessi dall'Observable come un array di stringhe
      this.professoriUnicam = result; // Stampa i valori su console
    });
  }

  getProfUnicam(): Observable<string[]> {
    return this.http
      .get<string[]>(environment.GET_LISTA_PROFESSORI_UNICAM)
      .pipe(
        map((response: any) =>
          response.map((profUnicam: any) => profUnicam.toString())
        )
      );
  }

  public getAttivita(): string {
    return this.attivita;
  }
  public getNome(): string {
    return this.nome;
  }
  public getCognome(): string {
    return this.cognome;
  }
  public getEmail(): string {
    return this.email;
  }
  public getCittaValue(): string {
    return this.citta;
  }
  public getListaCitta(): string[] {
    if (this.citta == '') {
      return this.cittaLista;
    }
    return this.cittaLista.filter(c =>
      c.startsWith(this.citta.toUpperCase())
    );
  }
  public getScuola(): string {
    return this.scuola;
  }
  public getAnnoAccademico(): string {
    return this.annoAccademico;
  }
}
