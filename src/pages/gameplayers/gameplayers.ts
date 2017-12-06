import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Player } from '../../models/player';

/**
 * Generated class for the GameplayersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gameplayers',
  templateUrl: 'gameplayers.html',
})
export class GameplayersPage {
  playersCollection: AngularFirestoreCollection<Player>
  players: Observable<Player[]>
  
  constructor(
    public afs: AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams) {
     // this.playersCollection = this.afs.collection<Player>('players',ref =>{
    //   return ref .where('team', '==', 'BBC Zele B')
    // })
    // this.players = this.playersCollection.valueChanges()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameplayersPage');
  }

}
