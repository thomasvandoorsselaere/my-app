import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { Game } from '../../models/game';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { GamedetailsPage } from '../gamedetails/gamedetails';
import { GameteamPage } from '../gameteam/gameteam';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { ProvidersGameProvider } from '../../providers/providers-game/providers-game';
import { GamePlayer } from '../../models/gameplayer';

/**
 * Generated class for the GamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {

gameCollection: AngularFirestoreCollection<Game>
games: Observable<Game[]>
gamePlayersCollection: AngularFirestoreCollection<GamePlayer>
gamePlayers: Observable<GamePlayer[]>
game: Game = {

}

  constructor(
    public navCtrl: NavController,
    private gameProvider: ProvidersGameProvider,
    public modelCtrl: ModalController,
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    public app: App,
    public navParams: NavParams) {

      this.gameCollection = this.afs.collection('game')
      this.games = this.afs.collection('game').valueChanges()

      this.games = this .gameCollection.snapshotChanges().map(changes => {
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesPage');

    console.log(this.games)
  }

  gamedetail(game : Game){
    let modalGameDetail = this.modelCtrl.create(GamedetailsPage,{gameName: game.id, gameID: game.gameId})
    modalGameDetail.present()
  }

  newGame(){
    let modal = this.modelCtrl.create(GameteamPage)
    modal.present()
  }

  gameDelete(game: Game){
    this.gameProvider.deleteGame(game);
  
  }

  logout(){
    this.afAuth.auth.signOut().then(()=> {
      this.app.getRootNav().setRoot(LoginPage);
    })
  }


}
