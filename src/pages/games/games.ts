import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { Game } from '../../models/game';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { GamedetailPage } from '../gamedetail/gamedetail';
import { GameteamPage } from '../gameteam/gameteam';
import { GamePage } from '../game/game';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { TeamplayersPage } from '../teamplayers/teamplayers';
import { ProvidersGameProvider } from '../../providers/providers-game/providers-game';

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesPage');

    console.log(this.games)
  }

  gamedetail(game: Game){
    let modalGameDetail = this.modelCtrl.create(TeamplayersPage)
    modalGameDetail.present
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
