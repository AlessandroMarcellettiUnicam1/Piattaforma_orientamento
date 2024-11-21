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
import { Observable, toArray } from 'rxjs';
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


  public scuole: Scuola[] =[];
  public universi: Universi[] | undefined;
  public risultati: Res[] = [];
  public risatt: Risatt[] = [];
  public anni: Anni[] = [];
  public prof: Professori[] = [];
  public profUnicam: ProfessoriUnicam[] = [];
  public profVisual : Profvisual[] =[]
  public profUnicamVisual : ProfUnicamvisual[] =[]
  public click = 0;
  public anno = 0;
  public annoVisual = '';
  public visualRis: Res[] = [];
  public visualRisAtt: Risatt[] = [];
  public ordinamenti = 'ISCRITTI';
  public ordinamentiAtt = 'ISCRITTI';
  public searchButton = document.getElementById('searchButton') as HTMLButtonElement;
public searchInput = document.getElementById('searchInput') as HTMLInputElement;

  ngOnInit(): void {
    this.getRes();
    this.getResatt();
    this.getScuole();
    this.getUniversi();
    this.getProfessoriUnicam();
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

  createProfVisual(){
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
      next: (response) => (this.risultati = response),
      complete: () => {
        this.anno = this.risultati[this.risultati.length - 1].annoAcc;
        
        this.creaAnnoVisual(this.anno);

        this.createAnni(this.risultati[0].annoAcc, this.anno);
        this.setRisultati();
        this.ordina();
        this.getResatt();
      },
      error: (error) => console.log(error),
    });
  }

  creaAnnoVisual(a: number) {
    let aI=  Math.floor(a/10000);
    let aF=a%10000
    let ain = (aI%100);
    let afin = (aF%100);
    
    this.annoVisual = ain + '/' + afin;
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

  cambioRisultati(e: any) {
    this.creaAnnoVisual(e);
    while (this.visualRis.length > 0) {
      this.visualRis.pop();
    }
    this.risultati.forEach((r) => {
      if (r.annoAcc == e) {
        this.visualRis.push(r);
      }
    });
    this.ordina();
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

  createAnni(i: number, f: number) {
   

    let ann: Anni = { value: 20212022, viewValue: 21 + '/' + 22 };
    this.anni.push(ann);
    let ann1: Anni = { value: 20222023, viewValue: 22 + '/' + 23 };
    this.anni.push(ann1);
    let ann2: Anni = { value: 20232024, viewValue: 23 + '/' + 24 };
    this.anni.push(ann2);
    let ann3: Anni = { value: 20242025, viewValue: 24 + '/' + 25 };
    this.anni.push(ann3);

  }

  onClick1() {
    this.click = 1;
  }
  onClick2() {
    this.click = 2;
  }
  onClick3() {
    this.click = 3;
  }
  onClick4() {
    this.click = 4;
  }

  cambioOrdinamento(e: any) {
    this.ordinamenti = e;
    this.ordina();
  }

  ordina() {
    if (this.visualRis.length > 0) {
      switch (this.ordinamenti) {
       
        case 'REGIONI':
          this.visualRis.sort((a, b) =>
            a.scuola.regione.localeCompare(b.scuola.regione)
          );
          break;
        case 'SCUOLE':
          this.visualRis.sort((a, b) =>
            a.scuola.nome.localeCompare(b.scuola.nome)
          );
          break;
        default:
          break;
      }
    }
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

let  annoi=this.annoVisual.substring(0,this.annoVisual.indexOf("/"));
let  annof=this.annoVisual.substring(this.annoVisual.indexOf("/")+1,this.annoVisual.length);
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
  let  annoi=this.annoVisual.substring(0,this.annoVisual.indexOf("/"));
let  annof=this.annoVisual.substring(this.annoVisual.indexOf("/")+1,this.annoVisual.length);
let annot =((parseInt(annoi)+2000)*10000)+(parseInt(annof)+2000);
  const url = 'http://localhost:8080/scuola/download';
  let body = {name:"scuole.xlsx",anno:annot };
  

 return this.http.post<Blob>(url, body, {
  responseType: 'blob' as 'json', // Indica al server che ci aspettiamo un blob come risposta
});

}










}
