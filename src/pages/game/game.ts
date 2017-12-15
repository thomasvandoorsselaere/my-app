import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Team } from '../../models/team';

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
team : Team

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = navParams.get("chosenTeam");
  }


  gameTeam(){
    this.navCtrl.push("GameteamPage");
  }

  gamePlayers(){
    this.navCtrl.push("GameplayersPage", {
      chosenTeam: this.team
    })
  }

  gameOptions(){
    this.navCtrl.push("GameoptionsPage")
  }

  startGame(){
    this.navCtrl.push("ActivegamePage",{
      chosenTeam: this.team
    })
     
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad GamePage');
    console.log(this.team)
  }


}
