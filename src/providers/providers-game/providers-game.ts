import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import { Player } from '../../models/player';
import { Gameoptions } from '../../models/gameoptions';
import { Game } from '../../models/game';

/*
  Generated class for the ProvidersGameProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvidersGameProvider {
  optionCollection : AngularFirestoreCollection<Gameoptions>
  Gameoptions: Observable<Gameoptions[]>
  gameHistory: Observable<Game[]>
  gameHistoryCollection: AngularFirestoreCollection<Game>

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

      this.gameHistoryCollection = this.afs.collection('game')

       this.gameHistory = this.gameHistoryCollection.snapshotChanges().map(changes => {
         return changes.map(a => {
           const data = a.payload.doc.data() as Game
           data.id = a.payload.doc.id
           return data
         })
       })
  }

  getOptions(){
    return this.Gameoptions
  }

  updateOptions(){
    this.Gameoptions[0] = this.afs.doc(`gameoptions\${gameoptions.id`) 
    this.Gameoptions[0].update()
  }

  getHistory(){
    return this.gameHistory
  }
  

}


