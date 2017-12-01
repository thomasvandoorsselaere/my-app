import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore'
import { Team } from '../../models/team';
import { Observable } from 'rxjs/Observable'


/*
  Generated class for the ProvidersTeamsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvidersTeamsProvider {
  teamsCollection: AngularFirestoreCollection<Team>
  teams: Observable<Team[]>

  constructor(public afs: AngularFirestore) {
    this.teams = this.afs.collection('team').valueChanges()
  }

  getTeams(){
    return this.teams
  }

}
