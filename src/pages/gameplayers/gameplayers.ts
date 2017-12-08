import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Player } from '../../models/player';
import { ProvidersTeamsProvider } from '../../providers/providers-teams/providers-teams';

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
 
  players: Player[]
  teamName: any

  constructor(
    private teamProvider: ProvidersTeamsProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameplayersPage');
    console.log(this.teamName)
    
    this.teamProvider.getPlayers(this.teamName).subscribe(players => {
      this.players = players
    })
    
  }


}
