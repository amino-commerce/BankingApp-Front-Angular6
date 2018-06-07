import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compte } from '../../domain/compte';
import { ComptesService } from '../../services/comptes.service';

@Component({
  selector: 'app-comptes-delete',
  templateUrl: './comptes-delete.component.html',
  styleUrls: ['./comptes-delete.component.css']
})
export class ComptesDeleteComponent implements OnInit {

  numCompte: string;
  compte: Compte =  { 'numero': null, 'proprietaire': null, 'solde': 0 };

  constructor( private _route: Router,
               private _router: ActivatedRoute,
               private _service: ComptesService) { }

  ngOnInit() {
    this._router.params.subscribe(
      parametres => {
              this.numCompte = parametres['id'];
              this.getCompteById(this.numCompte);
     },
      error => console.log('ATTENTION - Il y a erreur lors de la navigation vers Delete. Détails ' + error)
    );
   }
  getCompteById(id) {
   this._service.getCompteById(this.numCompte).subscribe(
     resp => this.compte = resp
   );
  }

  annulerDelete() {
    this._route.navigate(['/list']);
    console.log ('Annulation du DELETE et retour à la vue list');
  }
  confirmerDelete() {
      this._service.deleteCompteById(this.numCompte).subscribe(
        resp => {
                   this._route.navigate(['/list']);
                   console.log ('Confirmation DELETE et retour à la vue list');
               },
        err => console.log(`ATTENTION Il y a eu erreur lors du DELETE, Détails : ${err}`)
      );

  }

}
