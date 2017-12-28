import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import { Gameoptions } from '../../models/gameoptions';
import { Game } from '../../models/game';
import { GamePlayer } from '../../models/gameplayer';

/*
  Generated class for the ProvidersGameProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvidersGameProvider {
  optionCollection : AngularFirestoreCollection<Gameoptions>
  optionDoc: AngularFirestoreDocument<Gameoptions>
  Gameoptions: Observable<Gameoptions[]>
  gameHistory: Observable<Game[]>
  gameCollection: AngularFirestoreCollection<Game>
  gamePlayerCollection: AngularFirestoreCollection<GamePlayer>
  gamePlayersDoc: AngularFirestoreDocument<GamePlayer>

  gameDoc: AngularFirestoreDocument<Game>
  games: Observable<Game[]>
  gamePlayers: Observable<GamePlayer[]>

  // array doorsturen is niet correct je hebt de [0] waarde nodig van die array


  constructor(public afs: AngularFirestore) {
      this.Gameoptions = this.afs.collection('gameoptions').valueChanges()
      this.optionCollection = this.afs.collection('gameoptions')
      
          this.Gameoptions = this.optionCollection.snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Gameoptions
            data.id = a.payload.doc.id
            return data
          })
        })

        this.gameCollection = this.afs.collection('game')
        this.games = this.afs.collection('game').valueChanges()
  
        this.games = this .gameCollection.snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Game
            data.id = a.payload.doc.id
            return data
          })
        })

        this.gamePlayerCollection = this.afs.collection('gamePlayers')
        this.gamePlayers = this.gamePlayerCollection.snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as GamePlayer
            data.id = a.payload.doc.id
            return data
          })
        })
  }

  getOptions(){
    return this.Gameoptions
  }

  updateOptions(option: Gameoptions){
   this.optionDoc = this.afs.doc(`gameoptions/${option.id}`)
   this.optionDoc.update(option)
  }

  getHistory(){
    return this.gameHistory
  }

  addGame(game: Game){
    this.gameCollection.add(game)
  }

  addGamePlayer(gameplayer: GamePlayer){
    console.log('posting gameplayer: ', gameplayer)
    this.gamePlayerCollection.add(gameplayer)
  }

  deleteGame(game:Game){
    this.gameDoc = this.afs.doc(`game/${game.id}`)
    // this.gamePlayersDoc = this.afs.doc(`gamePlayers/${game.date}`)
    this.gameDoc.delete()
  }
  

}


