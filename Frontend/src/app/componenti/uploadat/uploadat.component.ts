import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Anni } from 'src/app/interface/anni';
import { Observable, toArray } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sede } from 'src/app/interface/sede';
@Component({
  selector: 'app-uploadat',
  templateUrl: './uploadat.component.html',
  styleUrls: ['./uploadat.component.css'],
  
})
export class UploadatComponent implements OnInit {
  private  tipo:string =''
  visualizza: string = 'ATT';
  private nome: string = '';
  private n:string="";
  private data = new FormData();
  private dataIscr = new FormData();
  private dataProf = new FormData();
  private dataProfUnicam = new FormData();
  constructor(private http: HttpClient) {}
  private anno=0;
  anni : Anni[] =[]
  annoAccademicoInizio: number=0;
  annoAccademicoFine: number=0;
private cognome:string='';
private email:string='';
 citta:string='';
scuole: string[]=[];
private attivita:string='';
selectedItem: string='';
scuola:string='';
sede: string='';
mostraCampoCitta: boolean = false;
dataInizio: Date = new Date(); 
dataFine: Date = new Date(); 
descrizione:string='';
professori: string[]=[];
professoriUnicam: string[]=[];
prof:string='';
 file: File | null = null;

cambioDescrizione(event: any) {
  this.descrizione = event.target.value;
  
}
  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.data.append('file', file);
     this.file=file;
    }
  }
  onChangeFileIscr(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file=file;
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
  onSelectionChange(event:any) {
    this.prof=event.target.value;
   
     }

  onClickIscr() {
    let anno=this.annoAccademicoInizio*10000+this.annoAccademicoFine;
    this.http
  
      .post('http://localhost:8080/universitari/uploadConAnno1/'+ ""+anno, this.dataIscr)
      .subscribe({
        next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
        error: (error) => console.log(error),
      });
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
  
    const file=this.file;
  
    let param;
    if(scuola==""){
param=nome+"&"+tipo+scuola+" "+this.sede+"-"+dataInizio.toString()+" "+dataFine.toString()+" "+descrizione+"+"+profUnicam+",+"+profReferente+"-"+anno.toString();
    }
    else{
       param=nome+"&"+tipo+" "+scuola.toString()+"-"+this.sede+"*"+dataInizio.toString()+" "+dataFine.toString()+" "+descrizione+"+"+profUnicam+",+"+profReferente+"-"+anno.toString();
    }
console.log(this.sede);
    this.http
      .post('http://localhost:8080/attivita/uploadConAnno1/'+""+param,this.data)
      .subscribe({
        next: (response) => console.log( alert("inserimento avvenuto con successo"), response),
        error: (error) => console.log(error),
      });

  


      
  }



  onclickProf() {
    
   
    this.http
      .post('http://localhost:8080/professori/uploadConFile1',  this.dataProf)
      .subscribe({
        next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
        error: (error) => console.log(error),
      });
  }


  onclickProfUnicam() {
    
   
    this.http
      .post('http://localhost:8080/professoriUnicam/uploadConFile1',  this.dataProfUnicam)
      .subscribe({
        next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
        error: (error) => console.log(error),
      });
  }


  cambio(event: any) {
    this.nome = event.target.value;
    
  }

  cambioSel(e: any) {
    this.visualizza = e;
    
  }


  setAnni(){
    let date = new Date();
    this.anno=(date.getFullYear()*2)+1;
    for(let i=this.anno-4;i<=this.anno; i++){
      let app = (i-1)/2;
      let  inizio :string = app.toString().substring(2,4);
      let fin = app+1;
      let fine : string = fin.toString().substring(2,4);
      let annoVis= inizio + "/"+ fine;
      let a :Anni = {value :i, viewValue:annoVis}
      this.anni.push(a)
      i++;
    }
  }

  cambioAnno(e: any) {
    this.anno=e;
    
  }

  ngOnInit(): void {
    this.setAnni()
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
  cambioAttivita(event: any) {
    this.attivita = event.target.value;
    
  }
  cambioTipo(event: any) {
    this.tipo = event.target.value;
    
  }
  submitAttForm() {
    if (this.validateYears()) {
      // Puoi eseguire qui le operazioni che desideri con i valori degli anni accademici
      
      this.onClick();
    } else {
      alert("Controlla gli anni accademici inseriti gli anni devono avere 4 cifre e l'anno inserito sotto deve essere quello sopra + 1.");
    }
  }
  submitIscrForm() {
    if (this.validateYears()) {
      // Puoi eseguire qui le operazioni che desideri con i valori degli anni accademici
 
      this.onClickIscr()
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

  showDropdownS: boolean = false;
  toggleDropdownS() {
   let array=this.getScuole();
   array.subscribe(
     (result: string[]) => {
       // Qui puoi utilizzare i valori emessi dall'Observable come un array di stringhe
       this.scuole=result; // Stampa i valori su console
     }
   );
   this.showDropdownS = !this.showDropdownS;
 }
 getScuole( ):Observable<string[]>{
 
   return this.http.get<string[]>('http://localhost:8080/scuola/scuoleCitta/'+this.citta).pipe(
     map((response: any) => response.map((scuola: any) => scuola.toString()))
   );
 }

 onSelectionChangeS(event:any) {
  this.scuola=event.target.value;
 
   }

   onclickSingleProf():void{
    const nome:string=this.nome;
    const cognome:string=this.cognome;
    const email:string=this.email;
   const attivita:string=this.attivita;

  const scuola=this.scuola;
  const citta=this.citta;

    let body = {email,nome,cognome,scuola,citta,attivita};
    
if(nome!=""&&cognome!=""&&email!=""&&attivita!=""&&scuola!=""){
    this.http
      .post('http://localhost:8080/professori/uploadSingleProf',body)
      .subscribe({
        next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
        error: (error) => console.log(error),
      });
    }

    else {
      alert("N.B:Tutti i campi devono essere riempiti");
    }
  }
  onclickSingleProfUnicam():void{
    const nome:string=this.nome;
    const cognome:string=this.cognome;
    const email:string=this.email;
   


    let body = {email,nome,cognome};
    
    if(nome!=""&&cognome!=""&&email!=""){
    this.http
      .post('http://localhost:8080/professoriUnicam/uploadSingleProf',body)
      .subscribe({
        next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
        error: (error) => console.log(error),
      });
    }
    else {
      alert("N.B:Tutti i campi devono essere riempiti");
    }
  }
  showDropdownP: boolean = false;
  toggleDropdownP() {
    let array=this.getReferenti();
    array.subscribe(
      (result: string[]) => {
        // Qui puoi utilizzare i valori emessi dall'Observable come un array di stringhe
        this.professori=result; // Stampa i valori su console
      }
    );
    this.showDropdownP = !this.showDropdownP;
  }
  getReferenti( ):Observable<string[]>{
    
    return this.http.get<string[]>('http://localhost:8080/professori/getReferenti').pipe(
      map((response: any) => response.map((prof: any) => prof.toString()))
    );
  }



  showDropdownU: boolean = false;
 
  toggleDropdownU() {
    let array=this.getProfUnicam();
    array.subscribe(
      (result: string[]) => {
        // Qui puoi utilizzare i valori emessi dall'Observable come un array di stringhe
        this.professoriUnicam=result; // Stampa i valori su console
      }
    );
    this.showDropdownU = !this.showDropdownU;
  }

  getProfUnicam( ):Observable<string[]>{
    
    return this.http.get<string[]>('http://localhost:8080/professoriUnicam/getProfUnicam').pipe(
      map((response: any) => response.map((profUnicam: any) => profUnicam.toString()))
    );
  }

  selectedProf: string[] = [];
  saveSelections() {
    this.selectedProf;
  }

}
