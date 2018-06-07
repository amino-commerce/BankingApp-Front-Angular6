import { Component, OnInit } from '@angular/core';
import { Compte } from '../../domain/compte';
import { ComptesService } from '../../services/comptes.service';

@Component({
  selector: 'app-comptes-list',
  templateUrl: './comptes-list.component.html',
  styleUrls: ['./comptes-list.component.css']
})
export class ComptesListComponent implements OnInit {

  data: Compte[];

  constructor(private _service: ComptesService) { }

  ngOnInit() {
    this._service.getAllComptes().subscribe(
            res => this.data = res,
            err => console.log(`ATTENTION, Il y a eu l'erreur: ${err} `)
    );
  }

}
