import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../shared/service/clients.service';

@Component({
  selector: 'app-admin-support',
  templateUrl: './admin-support.component.html',
  styleUrls: ['./admin-support.component.css']
})
export class AdminSupportComponent implements OnInit {

  suporteData: any;
  suporteQuantidade: any;
  suporteAtendido!: boolean;

  constructor(private clientServe: ClientsService) { }

  ngOnInit(): void {
    this.getSupport();
  }

  getSupport(){
    this.clientServe.getSupport().subscribe(data => {
      this.suporteData = data;
      this.suporteQuantidade = this.suporteData.length;
      this.suporteAtendido = this.suporteData.filter((suporte: { attended: boolean; }) => suporte.attended == true).length;
     console.log("suport", this.suporteAtendido)
      console.log("suport", this.suporteData)
    })
  }


}
