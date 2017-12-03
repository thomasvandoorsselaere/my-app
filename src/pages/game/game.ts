import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  gameTeam(){
    this.navCtrl.push("GameteamPage")
  }

  gamePlayers(){
    this.navCtrl.push("GameplayersPage")
  }

  startGame(){
    this.navCtrl.push("ActivegamePage")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }


}
