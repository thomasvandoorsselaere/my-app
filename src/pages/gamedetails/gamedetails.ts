import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Game } from '../../models/game';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { GamePlayer } from '../../models/gameplayer';
import { Player } from '../../models/player';

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

  valueselected = false
  gameCollection: AngularFirestoreCollection<Game>
  gameDetails: Observable<Game[]>
  game: Observable<Game[]>
  gameId : Game
  gameDate : Game
  gamePlayersCollection: AngularFirestoreCollection<GamePlayer>
  gamePlayers: Observable<GamePlayer[]>
  filteredPlayers: Observable<GamePlayer[]>



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

      this.gamePlayersCollection = this.afs.collection(`gamePlayers`)
      this.gamePlayers = this.gamePlayersCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as any
          data.id = a.payload.doc.id
          return data
        })
      })
      
      
      this.gameId = navParams.get("gameName")
      this.gameDate = navParams.get("gameDate")
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  filtergames(game){
    return this.gameDetails.map(x => x.filter(y => y.id === game))
  }
  filterPlayers(game){
    return this.gamePlayers.map(x => x.filter(y => y.date === game))
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad GamedetailsPage');
    this.game = this.filtergames(this.gameId)
    this.filteredPlayers = this.filterPlayers(this.gameDate)
    console.log(this.gameId)
    console.log(this.gameDate)
    console.log(this.gamePlayers)
  }

}
