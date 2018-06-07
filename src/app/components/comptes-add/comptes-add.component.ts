import { Component, OnInit } from '@angular/core';
import { Compte } from '../../domain/compte';
import { ComptesService } from '../../services/comptes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comptes-add',
  templateUrl: './comptes-add.component.html',
  styleUrls: ['./comptes-add.component.css']
})
export class ComptesAddComponent implements OnInit {

  compte: Compte = {
    'numero' : '',
    'proprietaire' : '',
    'solde': 0
  };
  constructor(private _service: ComptesService, private _router: Router) { }

  ngOnInit() {
  }

  ouvrirCompte() {
     this._service.addCompte(this.compte).subscribe(
       // Naviguer vers la vue list
       resp =>  this._router.navigate(['/list']),
       error => console.log(`ATTENTION:  Il y a eu l'erreur ${error} lors de l'ouverture du compte`)
     );

  }

}
