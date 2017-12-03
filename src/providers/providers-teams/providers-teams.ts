import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore'
import { Team } from '../../models/team';
import { Observable } from 'rxjs/Observable'
import { Player } from '../../models/player';


/*
  Generated class for the ProvidersTeamsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvidersTeamsProvider {
  teamsCollection: AngularFirestoreCollection<Team>
  playersCollection: AngularFirestoreCollection<Player>
  teams: Observable<Team[]>
  players: Observable<Player[]>
  teamDoc: AngularFirestoreDocument<Team>

  constructor(public afs: AngularFirestore) {
    this.teamsCollection = this.afs.collection('team')

    // this.teams = this.afs.collection('team').valueChanges()
    this.teams = this.teamsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Team
        data.id = a.payload.doc.id
        return data
      })
    })

    this.players = this.afs.collection('players').valueChanges()
  }

  getTeams(){
    return this.teams
  }

  getPlayers(){
    return this.players
  }

  addTeam(team: Team){
    this.teamsCollection.add(team)
  }

  deleteTeam(team: Team){
    this.teamDoc = this.afs.doc(`team/${team.id}`)
    this.teamDoc.delete()
  }

}
