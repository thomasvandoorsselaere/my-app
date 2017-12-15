import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    name: ''
  }
  teamName: any
  

  constructor(
    private teamProvider: ProvidersTeamsProvider, 
    public navCtrl: NavController,
    public afs: AngularFirestore, 
    public navParams: NavParams,) {
      
      this.playersCollection = this.afs.collection('players')
      this.players = this.playersCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Player
          data.id = a.payload.doc.id
          return data
        })
      })

      this.teamName = navParams.get("teamName")

      
  }

  onSubmit(player, team){
    if(this.player.name != ''){
      this.teamProvider.addPlayer(this.player, this.teamName)
      this.player.name = ''
      
    }
  }

  playerDelete(player){
    this.teamProvider.deletePlayer(player);
  }

  filterplayers(team){
    return this.players.map(x => x.filter(y => y.team === team))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamplayersPage');
    this.filteredPlayers = this.filterplayers(this.teamName)

    
  }

}
