
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, toArray } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-Form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
  })
export class FormdatComponent implements OnInit{

  items: string[]=[];
  item:string='';
  private nome: string = '';
  private cognome: string = '';
  private email: string = '';
  private visualizza: string = '';
   selectedItem: string='';
   citta: string='';
   scuole: string[]=[];
   private scuola: string='';
 constructor(private route: ActivatedRoute,private http : HttpClient) {

  }

  ngOnInit(): void {
    
 
  }

  showDropdown: boolean = false;

  toggleDropdown() {
    let array=this.getPendingActivities();
    array.subscribe(
      (result: string[]) => {
        
        this.items=result; 
      }
    );


    

    this.showDropdown = !this.showDropdown;
  }

  getPendingActivities(): Observable<string[]> {

    return this.http.get<string[]>('http://localhost:8080/professori/getPendingActivities').pipe(
      map((response: any) => response.map((item: any) => item.toString()))
    );
    return this.http.get<string[]>('http://localhost:8080/professori/getPendingActivities');
  }
 
  InviaIscrizione():void{
    const nome:string=this.nome;
    const cognome:string=this.cognome;
    const email:string=this.email;
   const nomeAttivitaAnno:string=this.visualizza;
   
  const nomeAttivita=nomeAttivitaAnno.substring(0,nomeAttivitaAnno.indexOf("2"));

  const anno=parseInt(nomeAttivitaAnno.substring(nomeAttivitaAnno.indexOf("2")));
  const scuola=this.scuola;

    let body = {nome,cognome,email,nomeAttivita,anno,scuola};
    
if(nomeAttivita!=""&&nome!=""&&cognome!=""&&email!=""&&scuola!=""){
    this.http
      .post('http://localhost:8080/studente/addIscrizione1',body)
      .subscribe({
        next: (response) => console.log(alert("inserimento avvenuto con successo"), response),
        error: (error) => console.log(error),
      });

    }
    else {
      alert("N.B:Tutti i campi devono essere riempiti");
    }


  }
  getScuole( ):Observable<string[]>{
    
    return this.http.get<string[]>('http://localhost:8080/scuola/scuoleCitta/'+this.citta).pipe(
      map((response: any) => response.map((scuola: any) => scuola.toString()))
    );
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
  selectItem(event: any) {
  
this.visualizza=event.target.value;
  }
  onSelectionChange(event:any) {
 this.visualizza=event.target.value;

  }

  onSelectionChangeS(event:any) {
    this.scuola=event.target.value;
   
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
 
}