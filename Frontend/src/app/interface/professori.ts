import { Id } from "./id";
import { Scuola } from "./scuola";

export interface Professori {
  email : string,
  nome: string,
  cognome : string,
  scuolaImp : Scuola,
  attivita : string
}
