import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Game } from '../../models/game';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

/**
 * Generated class for the GamedetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gamedetails',
  templateUrl: 'gamedetails.html',
})
export class GamedetailsPage {

  gameCollection: AngularFirestoreCollection<Game>
  gameDetails: Observable<Game[]>
  game: Observable<Game[]>
  gameId : Game
  gamePlayersCollection: AngularFirestoreCollection<any>
  gamePlayers: Observable<any[]>


  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public afs: AngularFirestore,
    public navParams: NavParams) {

      this.gameCollection = this.afs.collection('game')
      this.gameDetails = this.gameCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Game
          data.id = a.payload.doc.id
          return data
        })
      })

      this.gamePlayersCollection = this.afs.collection(`game/Mfp7ZdK8FNF0OWVyASDM/players`)
      this.gamePlayers = this.gamePlayersCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as any
          data.id = a.payload.doc.id
          return data
        })
      })
      // ${this.gameId}
      
      this.gameId = navParams.get("gameName")
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  filtergames(game){
    return this.gameDetails.map(x => x.filter(y => y.id === game))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamedetailsPage');
    this.game = this.filtergames(this.gameId)
    console.log(this.gameId)
    console.log(this.gamePlayers)
  }

}
