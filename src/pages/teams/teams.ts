import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ProvidersTeamsProvider } from '../../providers/providers-teams/providers-teams';
import { Team } from '../../models/team';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { TeamplayersPage } from '../teamplayers/teamplayers';
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
  teamsCollection: AngularFirestoreCollection<Team>
  teams: Observable<Team[]>
  filteredTeams: Observable<Team[]>
  teamDoc: AngularFirestoreDocument<Team>
  UserId: string
  team: Team ={
  }

  constructor(
    private teamProvider: ProvidersTeamsProvider, 
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public modelCtrl: ModalController,
    public alertCtrl: AlertController,
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
    let modal = this.modelCtrl.create(TeamplayersPage,{teamName: team.name})
    modal.present()
  }

  addteambutton(){
    let prompt = this.alertCtrl.create({
      title: 'Add team',
      message: "Enter a teamname",
      inputs: [
        {
          name: 'team',
          placeholder: 'teamname'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log(this.team)
            if(this.team.name != ''){
              this.team.userid = this.afAuth.auth.currentUser.uid
              this.team.name = data.team
              this.teamProvider.addTeam(this.team)
              this.team.name = ''
            }
          }
        }
      ]
    });
    prompt.present();
  }

  filterteams(UserId){
   return this.teams.map(x => x.filter(y => y.userid === UserId))
  }
 
 
  teamDelete(team){
    this.teamProvider.deleteTeam(team);
  }

  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    console.log(this.UserId)
    this.filteredTeams = this.filterteams(this.UserId)

  }

}
