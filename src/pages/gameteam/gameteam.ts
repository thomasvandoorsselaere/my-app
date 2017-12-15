import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ProvidersTeamsProvider } from '../../providers/providers-teams/providers-teams';
import { Team } from '../../models/team';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the GameteamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gameteam',
  templateUrl: 'gameteam.html',
})
export class GameteamPage {
  teamsCollection: AngularFirestoreCollection<Team>
  teams: Observable<Team[]>

  constructor(
    private teamProvider: ProvidersTeamsProvider,
    public navCtrl: NavController,
    public afs: AngularFirestore,
     public navParams: NavParams) {
      this.teamsCollection = this.afs.collection('team')
      
       this.teams = this.teamsCollection.snapshotChanges().map(changes => {
         return changes.map(a => {
           const data = a.payload.doc.data() as Team
           data.id = a.payload.doc.id
           return data
         })
       })

 
  }

  teamGame(team){
    this.navCtrl.push("GamePage",{
      
      chosenTeam: team.name
    })

  }

  

  ionViewWillEnter() {
      console.log('ionViewDidLoad GameteamPage');
  }
}

