import { InfoWindowManager } from '@agm/core';
import { Component, ComponentFactoryResolver, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Coords, LatLngLiteral } from 'leaflet';
import { Anni } from 'src/app/interface/anni';

import { Res } from 'src/app/interface/res';
import { Risreg } from 'src/app/interface/risreg';
import { ResService } from 'src/app/service/res.service';
import Swal from 'sweetalert2';






@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.component.html',
  styleUrls: ['./mappa.component.css']
})
export class MappaComponent implements OnInit {





  constructor(private resService: ResService,
    public dialog :MatDialog) {}

  public risultati : Res[] = []
  public risreg : Risreg[] | undefined;
  public anno : number =0;
  public a : Anni[] =[]
  public visualizza = false
  public visualRis : Res[] = []





public coord = [
  { nome : "Marche", iscr :0,id :"IT-57"},
  { nome : "Valle D'Aosta", iscr :0,id:"IT-23"},
  { nome : "Abruzzo", iscr :0 ,id :"IT_65"},
  { nome : "Basilicata", iscr :0 ,id:"IT-77"},
  { nome : "Campania", iscr :0 ,id:"IT-72"},
  { nome : "Emilia Romagna", iscr :0 ,id:"IT-45"},
  { nome : "Friuli-Venezia G." , iscr :0 ,id:"IT-36"},
  { nome : "Lazio" , iscr :0 ,id:"IT-62"},
  { nome : "Liguria" , iscr :0 ,id:"IT-42"},
  { nome : "Lombardia" , iscr :0 ,id:"IT-25"},
  { nome : "Molise" , iscr :0 ,id:"IT-67"},
  { nome : "Piemonte" , iscr :0 ,id:"IT-21"},
  { nome : "Puglia" , iscr :0 ,id:"IT-75"},
  { nome : "Sardegna" , iscr :0 ,id:"IT-88"},
  { nome : "Sicilia" , iscr :0 ,id:"IT-82"},
  { nome : "Toscana" , iscr :0 ,id:"IT-52"},
  { nome : "Trentno Alto Adige" , iscr :0,id:"IT-32" },
  { nome : "Umbria" , iscr :0 ,id:"IT-55"},
  { nome : "Veneto" , iscr :0,id:"IT-34"},
  { nome : "Calabria" , iscr :0 ,id:"IT-78"},
]

  lat = 41.87194;
  lng = 12.56738;



  closeDialog() {
    this.dialog.closeAll
   }



  openDialog(c:any): void {
    while(this.visualRis.length>0){
      this.visualRis.pop()
    }
    this.visualizza=true
    let nome: string
    this.coord.forEach(co=>{
      if(c.target.id==co.id){
        nome = co.nome.toUpperCase()
      }
    })
    if(this.risultati.length!=0){
      this.risultati.forEach(r=>{
        if(r.annoAcc==this.anno){
          if(nome !=null){
            if(r.scuola.regione==nome){
              if(r.iscritti.length>0){
                this.visualRis.push(r)
              }
            }
          }
        }
      })
    }

  }


  ngOnInit(): void {
    this.getRis();
  }


  setMap():void{
    if(this.risultati.length!=0){
      let i = this.risultati[0].annoAcc
      let f =this.risultati[this.risultati.length-1].annoAcc
      this.createAnni(i,f)
      this.risultati.forEach(r=>{
        if(r.annoAcc==this.anno){
          this.coord.forEach(c=>{
            if(c.nome.toUpperCase()==r.scuola.regione){
              c.iscr+=r.iscritti.length
            }
          })
        }
      })
      this.coord.forEach(c=>{
        console.log(c.nome,c.iscr)
        const box = document.getElementById(c.id)
        if (box!=null){
          if(c.iscr==0){
            box.style.fill = 'red'
          }
          if(c.iscr>0&&c.iscr<=9){
            box.style.fill = 'blue'
          }
          if(c.iscr>=10&&c.iscr<=99){
            box.style.fill = 'purple'
          }
          if(c.iscr>=100){
            box.style.fill = 'green'
          }
        }

      })
    }
  }


  createAnni (i:number,f:number):void{
   let x = i
   let ann: Anni = { value: 20212022, viewValue: 21 + '/' + 22 };
   this.a.push(ann);
   let ann1: Anni = { value: 20222023, viewValue: 22 + '/' + 23 };
   this.a.push(ann1);
   let ann2: Anni = { value: 20232024, viewValue: 23 + '/' + 24 };
   this.a.push(ann2);
   let ann3: Anni = { value: 20242025, viewValue: 24 + '/' + 25 };
   this.a.push(ann3);
  }


  getRis() :void {
    this.resService.getRes().subscribe({
      next: (response) => {
        this.risultati= response;
      },
      complete : ()=> {
        this.anno=this.risultati[this.risultati.length-1].annoAcc;
        this.setMap();
      },
      error: (error) => console.log(error),
    });

  }


  cambioSel(e:any ){
    this.visualizza=false
    this.anno = e
    this.coord.forEach(c=>{
      c.iscr=0;
    })
    if(this.risultati.length!=0){
      this.risultati.forEach(r=>{
        if(r.annoAcc==e){
          this.coord.forEach(c=>{
            if(c.nome.toUpperCase()==r.scuola.regione){
              c.iscr+=r.iscritti.length
            }
          })
        }
      })
      this.coord.forEach(c=>{
        const box = document.getElementById(c.id)
        if (box!=null){
          if(c.iscr==0){
            box.style.fill = 'red'
          }
          if(c.iscr>0&&c.iscr<=9){
            box.style.fill = 'blue'
          }
          if(c.iscr>=10&&c.iscr<=99){
            box.style.fill = 'purple'
          }
          if(c.iscr>=100){
            box.style.fill = 'green'
          }
        }
      })
    }
  }


  openD() {
    console.log("ciao")
  }







  cambioColore(arg0: string): string {
     let n : number
     let c : number=0
     let colore: string = '';
      if(this.risultati.length==0){
        return ''
      }else{
        this.risultati.forEach( r=>{
          if(r.scuola.regione==arg0.toUpperCase()){
            if(r.iscritti.length>0){
              c= c+r.iscritti.length
            }
          }else{
            colore = 'fill: red'
          }
        })
        if(c==0){
          colore = 'fill: red'
        }
        if(c>0&&c<9){
          colore = 'fill: blue'
        }
        if(c>=10&&c<99){
          colore = 'fill: purple'
        }
        if(c>=100){
          colore = 'fill: green'
        }

        return colore
      }
    }


}






@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./dialog-content-example-dialog.css']
})
export class DialogElementsExampleDialog implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data:Res[]){}
  result :Res[]=[];

  ngOnInit(): void {
      this.result=this.data
      console.log(this.result)
  }


}
