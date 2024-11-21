import { Sede } from "./sede";

export interface Activity{
nome: string;
    tipo: string;
    scuola: string;
    anno: number;
    sedeA: Sede;
    dataInizio: Date;
    dataFine: Date;
    descrizione: string;
    profUnicam: string[];
    profReferente: string;
}