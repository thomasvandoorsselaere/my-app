import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersTeamsProvider } from '../../providers/providers-teams/providers-teams';
import { Team } from '../../models/team';
import { Player } from '../../models/player'

/**
 * Generated class for the TeamplayersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teamplayers',
  templateUrl: 'teamplayers.html',
})
export class TeamplayersPage {
  players: Player[] 
  player: Player ={
    name: ''
  }
  team: any
  

  constructor(
    private teamProvider: ProvidersTeamsProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams,) {

      this.team = navParams.get("param1")
  }

  // onSubmit(player, team){
  //   if(this.player.name != ''){
  //     this.teamProvider.addPlayer(this.player)
  //     this.player.name = ''
  //   }
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamplayersPage');
    this.teamProvider.getPlayers().subscribe(players => {
      this.players = players
    })
  }

}
