import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Team } from '../../models/team';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

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
  filteredTeams: Observable<Team[]>
  UserId: string

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    public modelCtrl: ModalController,
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

       this.UserId = this.afAuth.auth.currentUser.uid
 
  }

  teamPlayers(team){
    let modal = this.modelCtrl.create("GameplayersPage",{
      chosenTeam: team.name
    })
    modal.present()
  }

  filterteams(UserId){
    return this.teams.map(x => x.filter(y => y.userid === UserId))
   }

  ionViewWillEnter() {
      console.log('ionViewDidLoad GameteamPage');
      this.filteredTeams = this.filterteams(this.UserId)
  }
}

