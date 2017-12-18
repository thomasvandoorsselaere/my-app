import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ProvidersTeamsProvider } from '../../providers/providers-teams/providers-teams';
import { Team } from '../../models/team';
import { Player } from '../../models/player'
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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
  playersCollection: AngularFirestoreCollection<Player>
  players: Observable<Player[]>
  playerDoc: AngularFirestoreDocument<Player>
  filteredPlayers: Observable<Player[]>
  
  player: Player ={
  }
  team: Team
  

  constructor(
    private teamProvider: ProvidersTeamsProvider, 
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController, 
    public navParams: NavParams,) {
      
      this.playersCollection = this.afs.collection('players')
      this.players = this.playersCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Player
          data.id = a.payload.doc.id
          return data
        })
      })

      this.team = navParams.get("teamName")

      
  }

  addplayerbutton(){
    let prompt = this.alertCtrl.create({
      title: 'Add player',
      message: "Enter a playersname",
      inputs: [
        {
          name: 'player',
          placeholder: 'playername'
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
            console.log(this.player)
            console.log(data.name)
            if(this.player.name != ''){
              this.player.name = data.player
              this.teamProvider.addPlayer(this.player, this.team)
              this.player.name = ''
              this.player.team = ''
            }
          }
        }
      ]
    });
    prompt.present();
  }

  // onSubmit(player, team){
  //   if(this.player.name != ''){
  //     this.teamProvider.addPlayer(this.player, this.team)
  //     this.player.name = ''
      
  //   }
  // }

  playerDelete(player){
    this.teamProvider.deletePlayer(player);
  }

  filterplayers(team){
    return this.players.map(x => x.filter(y => y.team === team))
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamplayersPage');
    this.filteredPlayers = this.filterplayers(this.team)

  }

}
