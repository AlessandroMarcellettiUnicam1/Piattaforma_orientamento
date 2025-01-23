import { Component, OnInit } from '@angular/core';
import { ScuoleService } from '../../service/scuole.service';
import { Scuola } from '../../interface/scuola';
import { Universi } from '../../interface/universi';
import { UniversiService } from '../../service/universi.service';
import { Res } from '../../interface/res';
import { ResService } from '../../service/res.service';
import { ResattService } from 'src/app/service/resatt.service';
import { Risatt } from 'src/app/interface/risatt';
import { Anni } from 'src/app/interface/anni';
import { ProfessoriService } from 'src/app/service/professori.service';
import { Professori } from 'src/app/interface/professori';
import { Profvisual } from 'src/app/interface/profvisual';
import { ProfUnicamvisual } from 'src/app/interface/profUnicamVisual';
import { ProfessoriUnicam } from 'src/app/interface/professoriUnicam';
import { ProfessoriUnicamService } from 'src/app/service/professoriUnicam.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { filter, Observable, toArray } from 'rxjs';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  constructor(private http: HttpClient,
    private scuolaService: ScuoleService,
    private universiService: UniversiService,
    private resService: ResService,
    private resatService: ResattService,
    private professoriService: ProfessoriService,
    private professoriUnicamService: ProfessoriUnicamService
  ) {}

  public isMenuOpened: boolean = false;
  public scuole: Scuola[] =[];
  public universi: Universi[] | undefined;
  public risultati: Res[] = [];
  public risatt: Risatt[] = [];
  public anni: Anni[] = [];
  public prof: Professori[] = [];
  public profUnicam: ProfessoriUnicam[] = [];
  public profVisual : Profvisual[] = [];
  public profUnicamVisual : ProfUnicamvisual[] = [];
  public click = 1;
  public anno = 0;
  public annoVisual = '';
  public visualRis: Res[] = [];
  public visualRisAtt: Risatt[] = [];
  public ordinamenti = '';
  public ordinamentiAtt = '';
  public searchButton = document.getElementById('searchButton') as HTMLButtonElement;
  public searchInput = document.getElementById('searchInput') as HTMLInputElement;
  public textFilter: string = '';
  public listaRegioni: string[] = [];
  public listaProvince: string[] = [];
  public listaCitta: string[] = [];
  public regione: string = '';
  public provincia: string = '';
  public citta: string = '';

  ngOnInit(): void {
    this.getRes();
    this.getResatt();
    this.getScuole();
    this.getUniversi();
    this.getProfessoriUnicam();
  }

  filterApply(event: any): void {
    this.textFilter = event.target.value;
  }

  getProfessori(): void {
    this.professoriService.getProfessori().subscribe({
      next: (response) => (this.prof = response),
      complete: () => {
        this.createProfVisual()
        },
      error: (error) => console.log(error),
    });
  }

  createProfVisual() {
    if(this.prof.length>0){
      this.prof.forEach(p=>{
        let nome = p.nome.toUpperCase();
        let cognome = p.cognome.toUpperCase();
        let id = p.email
        let prof = {email:p.email,nome: nome,cognome:cognome,scuolaImp:p.scuolaImp,attivita:p.attivita}
        this.scuole.forEach(s=>{
          if(s.idScuola== prof.scuolaImp.idScuola){
            let provis:Profvisual = {professore : prof,scuola :s}
            this.profVisual.push(provis)
          }
        })
      })
    }
  }
  getProfessoriUnicam(): void {
    this.professoriUnicamService.getProfessori().subscribe({
      next: (response) => (this.profUnicam = response),
      complete: () => {
        this.createProfUnicamVisual()
        },
      error: (error) => console.log(error),
    });
  }
  createProfUnicamVisual(){
    if(this.profUnicam.length>0){
      this.profUnicam.forEach(pUnicam=>{
        let nome = pUnicam.nome.toUpperCase();
        let cognome = pUnicam.cognome.toUpperCase();
        let id = pUnicam.email
        let profUnicam = {email:pUnicam.email,nome: nome,cognome:cognome}
        let provis:ProfUnicamvisual = {professore : profUnicam}
        this.profUnicamVisual.push(provis)
      })
    }
  }

  getScuole(): void {
    this.scuolaService.getScuole().subscribe({
      next: (response) => (this.scuole = response),
      complete: () => this.getProfessori(),
      error: (error) => console.log(error),
    });
  }

  getUniversi(): void {
    this.universiService.getUniversi().subscribe({
      next: (reponse) => (this.universi = reponse),
      error: (error) => console.log(error),
    });
  }

  getRes(): void {
    this.resService.getRes().subscribe({
      next: (response) => (this.visualRis = response),
      complete: () => this.creaAnniLista(),
      error: (error) => console.log(error),
    });
  }

  getVisualRis(): Res[] {
    let filteredVisualRis = this.visualRis;
    if(this.anno!=0) {
      filteredVisualRis = filteredVisualRis.filter(res => res.annoAcc==this.anno);
    }
    
    if(this.visualRis.length > 0) {
      switch(this.ordinamenti) {
       
        case 'REGIONI':
          filteredVisualRis.sort((a, b) =>
            a.scuola.regione.localeCompare(b.scuola.regione)
          );
          break;
        case 'SCUOLE':
          filteredVisualRis.sort((a, b) =>
            a.scuola.nome.localeCompare(b.scuola.nome)
          );
          break;
          case 'ISCRITTI':
            filteredVisualRis.sort((a, b) =>
              b.iscritti.length - a.iscritti.length
            );
            break;
        default:
          break;
      }
    }

    return filteredVisualRis;
  }

  creaAnniLista() {
    let listaAnni: Anni[]= [];
    let listValori: number[]= [];
    this.visualRis.forEach(r => listaAnni.push(this.creaDatoAnni(r.annoAcc)));
    listaAnni.forEach(a => {
      if(!listValori.includes(a.value)) {
        this.anni.push(a);
        listValori.push(a.value);
      }
    });
    this.anni.sort((a, b) => b.value - a.value);
  }

  creaDatoAnni(anno: number): Anni {
    let stringaAnno = anno.toString();
    let a: Anni = {
      value: anno,
      viewValue: stringaAnno.slice(2,4)+"/"+stringaAnno.slice(6),
    }
    return a;
  }
  
  creaStringaAnnoAcc(a: number) {
    let aI=  Math.floor(a/10000);
    let aF=a%10000
    let ain = (aI%100);
    let afin = (aF%100);
    
    return ain + '/' + afin;
  }

  setRisultati() {
    this.risultati.forEach((r) => {
      if (r.annoAcc == this.anno) {
        this.visualRis.push(r);
      }
    });
  }

  setRisultatiAtt() {
    this.risatt.forEach((r) => {
      if (r.annoAcc == this.anno) {
        this.visualRisAtt.push(r);
      }
    });
  }

  getResatt(): void {
    this.resatService.getRes().subscribe({
      next: (response) => (this.risatt = response),
      complete: () => {
        this.anno = this.risultati[this.risultati.length - 1].annoAcc;
        this.setRisultatiAtt();
        this.cambioOrdinamentoAtt('ISCRITTI');
      },
      error: (error) => console.log(error),
    });
  }

  cambioAnno(e: any) {
    this.anno = e;
  }

  cambioRisultati(e: any) {
    while (this.visualRis.length > 0) {
      this.visualRis.pop();
    }
    this.risultati.forEach((r) => {
      if (r.annoAcc == e) {
        this.visualRis.push(r);
      }
    });
    while (this.visualRisAtt.length > 0) {
      this.visualRisAtt.pop();
    }

    console.log(this.ordinamentiAtt)
    this.risatt.forEach((r) => {
      if (r.annoAcc == e) {
        this.visualRisAtt.push(r);
      }
    });
    this.cambioOrdinamentoAtt(this.ordinamentiAtt)
  }

  onClick1() {
    this.click = 1;
    this.onClickResetFilter();
  }
  onClick2() {
    this.click = 2;
    this.onClickResetFilter();
  }
  onClick3() {
    this.click = 3;
    this.onClickResetFilter();
  }
  onClick4() {
    this.click = 4;
    this.onClickResetFilter();
  }
  onClickResetFilter() {
    this.ordinamenti='';
    this.ordinamentiAtt='';
    this.regione='';
    this.provincia='';
    this.citta='';
    this.textFilter='';
  }

  cambioOrdinamento(e: any) {
    this.ordinamenti = e;
  }

  cambioProfRef(event: any) {
    this.prof = event.target.value;
  }

  cambioOrdinamentoAtt(e: any) {
    this.ordinamentiAtt=e
    switch (this.ordinamentiAtt) {
      case 'ISCRITTI':
        this.visualRisAtt.sort(
          (a, b) => b.universitarii.length - a.universitarii.length
        );
        break;
      case 'NOME':
        this.visualRisAtt.sort((a, b) => a.attivita.localeCompare(b.attivita));
        break;
      default:
        break;
    }
  }
  cambioRegione(e: any) {
    this.regione = e;
    if(this.regione=='') {
      this.provincia='';
      this.citta=''
    }
  }
  cambioProvincia(e: any) {
    this.provincia = e;
    if(this.provincia=='') {
      this.citta=''
    }
  }
  cambioCitta(e: any) {
    this.citta = e;
  }


 // Metodo per avviare il download del file
  scaricaVistaProfessori():void  {
    this.downloadProfFile().subscribe(
      (blob: Blob) => {
        // Creare un oggetto URL per il blob scaricato
        const url = window.URL.createObjectURL(blob);

        // Creare un link temporaneo e avviare il download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'professori.xlsx'; 
        document.body.appendChild(link);
        link.click();

        // Pulire l'URL creato per il blob
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Errore durante il download del file:', error);
      }
    );
  }
  downloadProfFile(): Observable<Blob> {
    const url = 'http://localhost:8080/professori/download';
    let body = {name:"professori.xlsx" };
  
    
  return this.http.post<Blob>(url, body, {
    responseType: 'blob' as 'json', 
  });

  }




 // Metodo per avviare il download del file
  scaricaVistaProfessoriUnicam():void  {
    this.downloadProfUnicamFile().subscribe(
      (blob: Blob) => {
        // Creare un oggetto URL per il blob scaricato
        const url = window.URL.createObjectURL(blob);

        // Creare un link temporaneo e avviare il download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'professoriUnicam.xlsx'; 
        document.body.appendChild(link);
        link.click();

        // Pulire l'URL creato per il blob
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Errore durante il download del file:', error);
      }
    );
  }

  downloadProfUnicamFile(): Observable<Blob> {
    const url = 'http://localhost:8080/professoriUnicam/download';
    let body = {name:"professoriUnicam.xlsx" };

  
    return this.http.post<Blob>(url, body, {
      responseType: 'blob' as 'json', 
    });
  }

  // Metodo per avviare il download del file
  scaricaVistarisulati():void  {
    this.downloadRisFile().subscribe(
      (blob: Blob) => {
        // Creare un oggetto URL per il blob scaricato
        const url = window.URL.createObjectURL(blob);

        // Creare un link temporaneo e avviare il download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'risultati.xlsx'; 
        document.body.appendChild(link);
        link.click();

        // Pulire l'URL creato per il blob
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Errore durante il download del file:', error);
      }
    );
  }
  downloadRisFile(): Observable<Blob> {

  let annoi=this.annoVisual.substring(0,this.annoVisual.indexOf("/"));
  let annof=this.annoVisual.substring(this.annoVisual.indexOf("/")+1,this.annoVisual.length);
  let annot = ((parseInt(annoi)+2000)*10000)+(parseInt(annof)+2000);


    const url = 'http://localhost:8080/risultati/download';
    let body = {name:"risultati.xlsx",anno:annot};

  return this.http.post<Blob>(url, body, {
    responseType: 'blob' as 'json', // Indica al server che ci aspettiamo un blob come risposta
  });
  }
  // Metodo per avviare il download del file
  scaricaVistaScuole():void  {
    this.downloadScuoleFile().subscribe(
      (blob: Blob) => {
        // Creare un oggetto URL per il blob scaricato
        const url = window.URL.createObjectURL(blob);

        // Creare un link temporaneo e avviare il download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'scuole.xlsx'; 
        document.body.appendChild(link);
        link.click();

        // Pulire l'URL creato per il blob
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Errore durante il download del file:', error);
      }
    );
  }
  downloadScuoleFile(): Observable<Blob> {
    let annoi=this.annoVisual.substring(0,this.annoVisual.indexOf("/"));
    let annof=this.annoVisual.substring(this.annoVisual.indexOf("/")+1,this.annoVisual.length);
    let annot =((parseInt(annoi)+2000)*10000)+(parseInt(annof)+2000);
    const url = 'http://localhost:8080/scuola/download';
    let body = {name:"scuole.xlsx",anno:annot };
    

  return this.http.post<Blob>(url, body, {
    responseType: 'blob' as 'json', // Indica al server che ci aspettiamo un blob come risposta
  });

  }

  getProfList(): Profvisual[] {
    let filteredProfVisual = this.profVisual;
    if(this.regione!='') {
      filteredProfVisual = this.profVisual.filter(p => p.professore.scuolaImp.regione.includes(this.regione));
      if(this.provincia!='') {
        filteredProfVisual = this.profVisual.filter(p => p.professore.scuolaImp.provincia.includes(this.provincia));
        if(this.citta!='') {
          filteredProfVisual = this.profVisual.filter(p => p.professore.scuolaImp.citta.includes(this.citta));
        }
      }
    }
    if(this.textFilter!='') {
      filteredProfVisual = filteredProfVisual.filter(p => p.professore.nome.startsWith(this.textFilter.toUpperCase())
                                        || p.professore.cognome.startsWith(this.textFilter.toUpperCase())
                                        || p.professore.email.startsWith(this.textFilter.toUpperCase())
                                      );
    }

    return filteredProfVisual;
  }

  getListFilteredWithText(list: Profvisual[]) {

  }

  getProfUnicamList(): ProfUnicamvisual[] {
    if(this.textFilter=='') {
      return this.profUnicamVisual;
    }
    return this.profUnicamVisual.filter(p => p.professore.nome.startsWith(this.textFilter.toUpperCase())
                                          || p.professore.cognome.startsWith(this.textFilter.toUpperCase())
                                          || p.professore.email.startsWith(this.textFilter.toUpperCase())
                                        );
  }

  getListaRegioni(): string[] {
    if(this.regione=='') {
      this.listaRegioni = [];
    }

    this.getProfList().forEach(p => {
      if(!this.listaRegioni.includes(p.scuola.regione)) {
        this.listaRegioni.push(p.scuola.regione);
      }
      });
    return this.listaRegioni.sort();
  }

  getListaProvince(): string[] {
    if(this.provincia=='') {
      this.listaProvince = [];
    }

    this.getProfList().forEach(p => {
      if(!this.listaProvince.includes(p.scuola.provincia) && p.scuola.regione==this.regione) { this.listaProvince.push(p.scuola.provincia); }
      });
    return this.listaProvince.sort();
  }

  getListaCitta(): string[] {
    if(this.citta=='') {
      this.listaCitta = [];
    }

    this.getProfList().forEach(p => {
      if(!this.listaCitta.includes(p.scuola.citta) && p.scuola.provincia==this.provincia) { this.listaCitta.push(p.scuola.citta); }
      });
    return this.listaCitta.sort();
  }

}