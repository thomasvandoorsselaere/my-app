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
  playerDoc: AngularFirestoreDocument<Player>


  constructor(public afs: AngularFirestore) {
    this.teamsCollection = this.afs.collection('team')

    this.teams = this.teamsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Team
        data.id = a.payload.doc.id
        return data
      })
    })

    this.playersCollection = this.afs.collection('players')
    this.players = this.playersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Player
        data.id = a.payload.doc.id
        return data
      })
    })
    
  }

  getTeams(){
    return this.teams
  }

  getPlayers(team: Team){
    return this.players.map(x => x.filter(y => y.team === team))
  }

  getPlayerByTeam(team: any){
    return this.players
  }

  addTeam(team: Team){
    this.teamsCollection.add(team)
  }

  deleteTeam(team: Team){
    this.teamDoc = this.afs.doc(`team/${team.id}`)
    this.teamDoc.delete()
  }

  addPlayer(player: Player, teamName: any){
    player.team = teamName
    this.playersCollection.add(player)
  }

  deletePlayer(player: Player){
    this.playerDoc = this.afs.doc(`players/${player.id}`)
    this.playerDoc.delete()
  }

  updatePlayer(player: Player){
    this.playerDoc = this.afs.doc(`players/${player.id}`)
    this.playerDoc.update(player)
   }

}
