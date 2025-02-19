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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})

export class StatsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private scuolaService: ScuoleService,
    private universiService: UniversiService,
    private resService: ResService,
    private resatService: ResattService,
    private professoriService: ProfessoriService,
    private professoriUnicamService: ProfessoriUnicamService
  ) {}

  public isMenuOpened: boolean = false;
  public scuole: Scuola[] = [];
  public universi: Universi[] | undefined;
  public anniRes: Anni[] = [];
  public anniRisAtt: Anni[] = [];
  public prof: Professori[] = [];
  public profUnicam: ProfessoriUnicam[] = [];
  public profVisual: Profvisual[] = [];
  public profUnicamVisual: ProfUnicamvisual[] = [];
  public click = 0;
  public anno = 0;
  public annoVisual = '';
  public res: Res[] = [];
  public risAtt: Risatt[] = [];
  public ordinamenti = 'ANNO';
  public ordinamentiAtt = 'ANNO';
  public searchButton = document.getElementById('searchButton') as HTMLButtonElement;
  public searchInput = document.getElementById('searchInput') as HTMLInputElement;
  public textFilterC: string = '';
  public textFilterA: string = '';
  public textFilterP: string = '';
  public listaRegioni: string[] = [];
  public listaProvince: string[] = [];
  public listaCitta: string[] = [];
  public regione: string = '';
  public provincia: string = '';
  public citta: string = '';
  public mainDataChart: [string, number][] = [];
  public dataChart: [string, number][] = [];
  public mainChartType: any;
  public mainChartColumnsSch: any;
  public mainChartColumnsAct: any;
  public mainChartDataSch: any[] = [];
  public mainChartDataAct: any[] = [];
  public optChartType: any;
  public optChartColumnsSch: any;
  public optChartColumnsAct: any;
  public optChartDataSch: any[] = [];
  public optChartDataAct: any[] = [];


  ngOnInit(): void {
    this.getRes();
    this.getRisAtt();
    this.getScuole();
    this.getUniversi();
    this.getProfessoriUnicam();
    this.onClick1();
  }

  onClick1() {
    this.click = 1;
    this.onClickResetFilter();
    //Dati per modificare il grafico
    this.mainChartType=ChartType.Bar;
    this.mainChartColumnsSch=["Anno accademico", "Partecipanti", "Immatricolati"];
  
    this.optChartType=ChartType.PieChart;
    this.optChartColumnsSch=["Attivita", "Partecipanti", "Immatricolati"];
  }
  onClick2() {
    this.click = 2;
    this.onClickResetFilter();
    //Dati per modificare il grafico
    this.mainChartType=ChartType.Bar;
    this.mainChartColumnsAct=["Anno accademico", "Immatricolati"];
  
    this.optChartType=ChartType.PieChart;
    this.optChartColumnsAct=["Attivita", "Immatricolati"];
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
    this.anno = 0;
    this.ordinamenti = '';
    this.ordinamentiAtt = '';
    this.regione = '';
    this.provincia = '';
    this.citta = '';
    this.textFilterA = '';
    this.textFilterP = '';
  } 

  textFilterCityApply(event: any): void {
    this.textFilterC = event.target.value;
  }

  textFilterActivityApply(event: any): void {
    this.textFilterA = event.target.value;
  }

  textFilterProfApply(event: any): void {
    this.textFilterP = event.target.value;
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
    if (this.prof.length > 0) {
      this.prof.forEach(p => {
        let nome = p.nome.toUpperCase();
        let cognome = p.cognome.toUpperCase();
        let id = p.email
        let prof = { email: p.email, nome: nome, cognome: cognome, scuolaImp: p.scuolaImp, attivita: p.attivita }
        this.scuole.forEach(s => {
          if (s.idScuola == prof.scuolaImp.idScuola) {
            let provis: Profvisual = { professore: prof, scuola: s }
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
  createProfUnicamVisual() {
    if (this.profUnicam.length > 0) {
      this.profUnicam.forEach(pUnicam => {
        let nome = pUnicam.nome.toUpperCase();
        let cognome = pUnicam.cognome.toUpperCase();
        let id = pUnicam.email
        let profUnicam = { email: pUnicam.email, nome: nome, cognome: cognome }
        let provis: ProfUnicamvisual = { professore: profUnicam }
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
      next: (response) => (this.res = response),
      complete: () => {
        this.creaAnniListaRes();
        this.res.sort((a, b) => b.annoAcc - a.annoAcc);
        this.updateMainChartRes();
      },
      error: (error) => console.log(error),
    });
  }

  getFilteredRes(): Res[] {
    let filteredRes = this.res;
    if (this.anno != 0) {
      filteredRes = filteredRes.filter(res => res.annoAcc == this.anno);
    }

    if (this.regione != '') {
      filteredRes = filteredRes.filter(res => res.scuola.regione == this.regione);
      if (this.provincia != '') {
        filteredRes = filteredRes.filter(res => res.scuola.provincia.includes(this.provincia));

      }
    }
    if (this.citta != '') {
      filteredRes = filteredRes.filter(res => res.scuola.citta.includes(this.citta));
    }

    if (this.res.length > 0) {
      switch (this.ordinamenti) {
        case 'ANNO':
          filteredRes.sort((a, b) => a.annoAcc - b.annoAcc);
          break;
        case 'REGIONI':
          filteredRes.sort((a, b) =>
            a.scuola.regione.localeCompare(b.scuola.regione)
          );
          break;
        case 'SCUOLE':
          filteredRes.sort((a, b) =>
            a.scuola.nome.localeCompare(b.scuola.nome)
          );
          break;
        case 'ISCRITTI':
          filteredRes.sort((a, b) =>
            b.iscritti.length - a.iscritti.length
          );
          break;
        default:
          break;
      }
    }

    return filteredRes;
  }

  getRisAtt(): void {
    this.resatService.getRes().subscribe({
      next: (response) => (this.risAtt = response),
      complete: () => {
        this.creaAnniListaRisAtt();
        this.risAtt.sort((a, b) => b.annoAcc - a.annoAcc);
        this.updateMainChartRisAtt();
      },
      error: (error) => console.log(error),
    });
  }

  getFilteredRisAtt(): Risatt[] {
    let filteredRisAtt = this.risAtt;
    if (this.anno != 0) {
      filteredRisAtt = filteredRisAtt.filter(ris => ris.annoAcc == this.anno);
    }

    if (this.risAtt.length > 0) {
      switch (this.ordinamentiAtt) {
        case 'ANNO':
          filteredRisAtt.sort((a, b) => b.annoAcc - a.annoAcc);
          break;
        case 'NOME':
          filteredRisAtt.sort((a, b) =>
            a.attivita.localeCompare(b.attivita)
          );
          break;
        case 'ISCRITTI':
          filteredRisAtt.sort((a, b) =>
            b.universitarii.length - a.universitarii.length
          );
          break;
        default:
          break;
      }
    }

    if (this.textFilterA != '') {
      filteredRisAtt = filteredRisAtt.filter(ris => ris.attivita.toLowerCase().startsWith(this.textFilterA.toLowerCase()));
    }

    return filteredRisAtt;
  }

  updateMainChartRes() {
    let i = this.anniRes.length-1;
    let dataChart = [];
    while(i >= 0) {
      let immatricolati = 0;
      let partecipanti = 0;
      this.res.forEach((s) => {
        if(s.annoAcc == this.anniRes[i].value) {
          immatricolati += s.iscritti.length;
          s.attivita.forEach(a => partecipanti += a.partecipanti.length)
        }
      });
      dataChart.push([this.anniRes[i].viewValue, partecipanti, immatricolati]);
      i--;
    }
    this.mainChartDataSch = dataChart;
  }

  updateOptChartRes() {
    let i = this.res.length-1;
    let dataChart = [];
    while(i > 0) {
      let regione = this.res[i].scuola.regione;
      let partecipanti = 0;
      let immatricolati = 0;
      this.res.forEach((a) => {
        if(a.annoAcc == this.anno) {
          if(regione==a.scuola.regione) {
            a.attivita.forEach(att => partecipanti += att.partecipanti.length);
            immatricolati += a.iscritti.length;
          }
        }
      });
      dataChart.push([regione, partecipanti, immatricolati]);
      i--;
    }
    this.optChartDataSch = dataChart;
  }

  updateMainChartRisAtt() {
    let i = this.anniRisAtt.length-1;
    let dataChart = [];
    while(i >= 0) {
      let immatricolati = 0;
      this.risAtt.forEach((a) => {
        if(a.annoAcc == this.anniRisAtt[i].value) {
          immatricolati += a.universitarii.length;
        }
      });
      dataChart.push([this.anniRisAtt[i].viewValue, immatricolati]);
      i--;
    }
    this.mainChartDataAct = dataChart;
  }

  updateOptChartRisAtt() {
    let dataChart: any[] = [];
    this.risAtt.forEach((a) => {
      if(a.annoAcc == this.anno) {
        dataChart.push([a.attivita, a.universitarii.length]);
      }
    });
    this.optChartDataAct = dataChart;
  }

  creaAnniListaRes() {
    let listaAnni: Anni[] = [];
    let listValori: number[] = [];
    this.res.forEach(r => listaAnni.push(this.creaDatoAnni(r.annoAcc)));
    listaAnni.forEach(a => {
      if (!listValori.includes(a.value)) {
        this.anniRes.push(a);
        listValori.push(a.value);
      }
    });
    this.anniRes.sort((a, b) => b.value - a.value);
  }

  creaAnniListaRisAtt() {
    let listaAnni: Anni[] = [];
    let listValori: number[] = [];
    this.risAtt.forEach(r => listaAnni.push(this.creaDatoAnni(r.annoAcc)));
    listaAnni.forEach(a => {
      if (!listValori.includes(a.value)) {
        this.anniRisAtt.push(a);
        listValori.push(a.value);
      }
    });
    this.anniRisAtt.sort((a, b) => b.value - a.value);
  }

  creaDatoAnni(anno: number): Anni {
    let stringaAnno = anno.toString();
    let a: Anni = {
      value: anno,
      viewValue: stringaAnno.slice(2, 4) + '/' + stringaAnno.slice(6),
    }
    return a;
  }

  creaStringaAnnoAcc(a: number) {
    let aI = Math.floor(a / 10000);
    let aF = a % 10000
    let ain = (aI % 100);
    let afin = (aF % 100);

    return ain + '/' + afin;
  }

  cambioAnno(e: any) {
    this.anno = e;
    if(this.click==1) {
      this.updateOptChartRes();
    }
    if(this.click==1) {
      this.updateOptChartRisAtt();
    }
  }

  cambioRisultati(e: any) {
    while (this.res.length > 0) {
      this.res.pop();
    }
    this.res.forEach((r) => {
      if (r.annoAcc == e) {
        this.res.push(r);
      }
    });
    while (this.risAtt.length > 0) {
      this.risAtt.pop();
    }

    this.risAtt.forEach((r) => {
      if (r.annoAcc == e) {
        this.risAtt.push(r);
      }
    });
    this.cambioOrdinamentoAtt(this.ordinamentiAtt)
  }

  cambioOrdinamento(e: any) {
    this.ordinamenti = e;
  }

  cambioProfRef(event: any) {
    this.prof = event.target.value;
  }

  cambioOrdinamentoAtt(e: any) {
    this.ordinamentiAtt = e
  }
  cambioRegione(e: any) {
    this.regione = e;
    this.provincia = '';
    this.citta = '';
  }
  cambioProvincia(e: any) {
    this.provincia = e;
    this.citta = '';
  }
  cambioCitta(e: any) {
    this.citta = e;
  }


  // Metodo per avviare il download del file
  scaricaVistaProfessori(): void {
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
    let body = { name: "professori.xlsx" };

    return this.http.post<Blob>(environment.POST_DOWNLOAD_PROFESSORI_REFERNIT, body, {
      responseType: 'blob' as 'json',
    });

  }

  // Metodo per avviare il download del file
  scaricaVistaProfessoriUnicam(): void {
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
    let body = { name: "professoriUnicam.xlsx" };

    return this.http.post<Blob>(environment.POST_DOWNLOAD_PROFESSORI_UNICAM, body, {
      responseType: 'blob' as 'json',
    });
  }

  // Metodo per avviare il download del file
  scaricaVistarisulati(): void {
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

    let annoi = this.annoVisual.substring(0, this.annoVisual.indexOf("/"));
    let annof = this.annoVisual.substring(this.annoVisual.indexOf("/") + 1, this.annoVisual.length);
    let annot = ((parseInt(annoi) + 2000) * 10000) + (parseInt(annof) + 2000);

    let body = { name: "risultati.xlsx", anno: annot };

    return this.http.post<Blob>(environment.POST_DOWNLOAD_RISULTATI, body, {
      responseType: 'blob' as 'json', // Indica al server che ci aspettiamo un blob come risposta
    });
  }
  // Metodo per avviare il download del file
  scaricaVistaScuole(): void {
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
    let annoi = this.annoVisual.substring(0, this.annoVisual.indexOf("/"));
    let annof = this.annoVisual.substring(this.annoVisual.indexOf("/") + 1, this.annoVisual.length);
    let annot = ((parseInt(annoi) + 2000) * 10000) + (parseInt(annof) + 2000);

    let body = { name: "scuole.xlsx", anno: annot };

    return this.http.post<Blob>(environment.POST_DOWNLOAD_SCUOLE, body, {
      responseType: 'blob' as 'json', // Indica al server che ci aspettiamo un blob come risposta
    });

  }

  getProfList(): Profvisual[] {
    let filteredProfVisual = this.profVisual;
    if (this.regione != '') {
      filteredProfVisual = filteredProfVisual.filter(p => p.professore.scuolaImp.regione.includes(this.regione));
      if (this.provincia != '') {
        filteredProfVisual = filteredProfVisual.filter(p => p.professore.scuolaImp.provincia.includes(this.provincia));
        if (this.citta != '') {
          filteredProfVisual = filteredProfVisual.filter(p => p.professore.scuolaImp.citta.includes(this.citta));
        }
      }
    }
    if (this.textFilterP != '') {
      filteredProfVisual = filteredProfVisual.filter(p => p.professore.nome.startsWith(this.textFilterP.toUpperCase())
        || p.professore.cognome.startsWith(this.textFilterP.toUpperCase())
        || p.professore.email.startsWith(this.textFilterP.toUpperCase())
      );
    }

    return filteredProfVisual;
  }

  getProfUnicamList(): ProfUnicamvisual[] {
    if (this.textFilterP == '') {
      return this.profUnicamVisual;
    }
    return this.profUnicamVisual.filter(p => p.professore.nome.startsWith(this.textFilterP.toUpperCase())
      || p.professore.cognome.startsWith(this.textFilterP.toUpperCase())
      || p.professore.email.startsWith(this.textFilterP.toUpperCase())
    );
  }

  getListaRegioni(): string[] {
    if (this.regione == '') {
      this.listaRegioni = [];
    }
    if (this.click == 1) {

      this.res.forEach(res => {
        if (!this.listaRegioni.includes(res.scuola.regione)) {
          this.listaRegioni.push(res.scuola.regione);
        }
      });
    }
    if (this.click == 3) {

      this.getProfList().forEach(p => {
        if (!this.listaRegioni.includes(p.scuola.regione)) {
          this.listaRegioni.push(p.scuola.regione);
        }
      });
    }

    return this.listaRegioni.sort();
  }

  getListaProvince(): string[] {
    if (this.provincia == '') {
      this.listaProvince = [];
    }
    if (this.click == 1) {

      this.res.forEach(res => {
        if (!this.listaProvince.includes(res.scuola.provincia) && res.scuola.regione == this.regione) {
          this.listaProvince.push(res.scuola.provincia);
        }
      });
    }
    if (this.click == 3) {

      this.getProfList().forEach(p => {
        if (!this.listaProvince.includes(p.scuola.provincia) && p.scuola.regione == this.regione) {
          this.listaProvince.push(p.scuola.provincia);
        }
      });
    }
    return this.listaProvince.sort();
  }

  getListaCitta(): string[] {
    if (this.citta == '') {
      this.listaCitta = [];
    }
    if (this.click == 1) {

      this.res.forEach(res => {
        if (!this.listaCitta.includes(res.scuola.citta) && res.scuola.provincia == this.provincia && res.scuola.citta != null) {
          this.listaCitta.push(res.scuola.citta);
        }
      });
    }
    if (this.click == 3) {

      this.getProfList().forEach(p => {
        if (!this.listaCitta.includes(p.scuola.citta) && p.scuola.provincia == this.provincia) {
          this.listaCitta.push(p.scuola.citta);
        }
      });
    }

    return this.listaCitta.sort();
  }

}