import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersTeamsProvider } from '../../providers/providers-teams/providers-teams';
import { Team } from '../../models/team';
/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  teams: Team[]
  team: Team ={
    name: ''
  }

  constructor(
    private teamProvider: ProvidersTeamsProvider, 
    public navCtrl: NavController,
    public navParams: NavParams) {
  }
  teamPlayers(){
    this.navCtrl.push("TeamplayersPage")
  }

  onSubmit(){
    if(this.team.name != ''){
      this.teamProvider.addTeam(this.team)
      this.team.name = ''
    }
  }

  teamDelete(team){
    this.teamProvider.deleteTeam(team);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');

    this.teamProvider.getTeams().subscribe(teams => {
      // console.log(teams)
      this.teams = teams
    })



  }

}
