import { Scuola } from "./scuola"

export interface Risprof {
    id:string
    nome: string
    cognome : string
    attivita:string
    scuola:Scuola
  }