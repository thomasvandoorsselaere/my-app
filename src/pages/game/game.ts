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
teamName : any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.teamName = navParams.get("teamName")
  }


  gameTeam(){
    this.navCtrl.push("GameteamPage")
  }

  gamePlayers(){
    this.navCtrl.push("GameplayersPage", {
      teamNamePlayers: this.teamName
    })
  }

  gameOptions(){
    this.navCtrl.push("GameoptionsPage")
  }

  startGame(){
    this.navCtrl.push("ActivegamePage",{
      teamNameUsed: this.teamName
    })
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    console.log(this.teamName)
  }


}
