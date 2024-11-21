

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
 
  showAdminForm: boolean = false;
  anno:number=0;
  constructor(private http: HttpClient) {}
  annoAccademicoInizio: number=0;
  annoAccademicoFine: number=0;
  private nome: string = '';
  private scuola: string='';
   citta: string='';
   dataInizio: Date = new Date(); 
   dataFine: Date = new Date(); 
  private  tipo:string =''
  items: string[]=[];
  scuole: string[]=[];
  professori: string[]=[];
  professoriUnicam: string[]=[];
  private visualizza:string='';
  mostraCampoCitta: boolean = false;
  sede: string='';
  selectedItem: string='';
descrizione:string='';
prof:string='';
private visualizzaAtt:string='';



  
  ngOnInit(): void {
    
 
      }

  toggleAdminForm() {
    this.showAdminForm = !this.showAdminForm;
  }


  inviaForm() {
  
  
    if (this.validateYears()) {
      // Puoi eseguire qui le operazioni che desideri con i valori degli anni accademici
 
      
      this.onClick()

    } else {
      alert("Controlla gli anni accademici inseriti gli anni devono avere 4 cifre e l'anno inserito sotto deve essere quello sopra + 1.");
    }
    

  
}





  validateYears(): boolean {
    if (this.annoAccademicoInizio && this.annoAccademicoFine) {
      if (this.annoAccademicoFine === this.annoAccademicoInizio + 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onClick() {
    const nome:string=this.nome;
    const tipo:string=this.tipo;
    const scuola:string=this.scuola;
   let sedeA:Sede=Sede.Online;
    const anno:number=this.anno=this.annoAccademicoInizio*10000+this.annoAccademicoFine;
    switch (this.sede) {
      case "Online":
          sedeA=Sede.Online;
          break;
      case "Università":
        sedeA=Sede.Università;
          break;
      case "Scuola":
        sedeA=Sede.Scuola;
          break;
      case "Altro":
        sedeA=Sede.Altro;
          break;
  }
    
    const nomeScuola:string=this.scuola;
    const cittaScuola:string=this.citta;
    const dataInizio=this.dataInizio;
    const dataFine=this.dataFine;
    const descrizione=this.descrizione;
    const profUnicam=this.selectedProf;
    const profReferente=this.prof;

   
    let body = {nome,tipo,scuola,anno,sedeA,dataInizio,dataFine,descrizione,profUnicam,profReferente};
    this.http
      .post<string>('http://localhost:8080/professori/createEmptyActivity1',body)
      .subscribe({
        next: (response) => console.log( alert("inserimento avvenuto con successo"), response),
        error: (error) => console.log(error),
      });
  }


  cambioNome(event: any) {
    this.nome = event.target.value;
    
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

   showDropdown: boolean = false;

   toggleDropdown() {
     let array=this.getPendingActivities();
     array.subscribe(
       (result: string[]) => {
         
         this.items=result; // Stampa i valori su console
       }
     );
 
 
     
 
     this.showDropdown = !this.showDropdown;
   }
   showDropdownS: boolean = false;
   toggleDropdownS() {
    let array=this.getScuole();
    array.subscribe(
      (result: string[]) => {
       
        this.scuole=result; // Stampa i valori su console
      }
    );
    this.showDropdownS = !this.showDropdownS;
  }
  showDropdownP: boolean = false;
  toggleDropdownP() {
    let array=this.getReferenti();
    array.subscribe(
      (result: string[]) => {
      
        this.professori=result; // Stampa i valori su console
      }
    );
    this.showDropdownP = !this.showDropdownP;
  }
  showDropdownU: boolean = false;
  toggleDropdownU() {
    let array=this.getProfUnicam();
    array.subscribe(
      (result: string[]) => {
      
        this.professoriUnicam=result; // Stampa i valori su console
      }
    );
    this.showDropdownU = !this.showDropdownU;
  }



   getPendingActivities(): Observable<string[]> {

    return this.http.get<string[]>('http://localhost:8080/professori/getPendingActivities').pipe(
      map((response: any) => response.map((item: any) => item.toString()))
    );
    return this.http.get<string[]>('http://localhost:8080/professori/getPendingActivities');
  }


  getScuole( ):Observable<string[]>{
    
    return this.http.get<string[]>('http://localhost:8080/scuola/scuoleCitta/'+this.citta).pipe(
      map((response: any) => response.map((scuola: any) => scuola.toString()))
    );
  }
  getReferenti( ):Observable<string[]>{
    
    return this.http.get<string[]>('http://localhost:8080/professori/getReferenti').pipe(
      map((response: any) => response.map((prof: any) => prof.toString()))
    );
  }
  getProfUnicam( ):Observable<string[]>{
    
    return this.http.get<string[]>('http://localhost:8080/professoriUnicam/getProfUnicam').pipe(
      map((response: any) => response.map((profUnicam: any) => profUnicam.toString()))
    );
  }

  handleButtonClick(): void {
    const nomeAttivitaAnno:string=this.visualizzaAtt;
   
    const nomeAttivita=nomeAttivitaAnno.substring(0,nomeAttivitaAnno.indexOf("4")-1);
    const nome:string=this.visualizzaAtt;
   
    let body = {nome};
    if(nome!=""){
    this.http
    .post('http://localhost:8080/professori/uploadActivityDefinitively',body)
    .subscribe({
      next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
      error: (error) => console.log(error),
    });
  }
  else {
    alert("N.B:Tutti i campi devono essere riempiti");
  }
  }

  selectItem(event: any) {
    this.visualizza=event.target.value;
      }


      onSelectionChange(event:any) {
        this.prof=event.target.value;
       
         }
         onSelectionChangeS(event:any) {
          this.scuola=event.target.value;
         
           }
           onSelectionChangeAtt(event:any) {
            this.visualizzaAtt=event.target.value;
           
             }

         onSedeChange(event: Event): void {
          const selectedSede = (event.target as HTMLSelectElement).value;
          this.mostraCampoCitta = selectedSede === 'scuola';
        }

        selectedProf: string[] = [];
  saveSelections() {
    this.selectedProf;
  }
      
}




