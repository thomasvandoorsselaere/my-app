import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Player } from '../../models/player';
import { ProvidersTeamsProvider } from '../../providers/providers-teams/providers-teams';
import { Team } from '../../models/team';

/**
 * Generated class for the GameplayersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gameplayers',
  templateUrl: 'gameplayers.html',
})
export class GameplayersPage {
  playersCollection: AngularFirestoreCollection<Player>
  players: Observable<Player[]>
  filteredPlayers: Observable<Player[]>
  chosenTeam: Team;

  constructor(
    private teamProvider: ProvidersTeamsProvider,
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public navParams: NavParams) {
      
      this.playersCollection = this.afs.collection('players')
      this.players = this.playersCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Player
          data.id = a.payload.doc.id
          return data
        })
      })


      this.chosenTeam = navParams.get("chosenTeam")


  }



  selectedPlayers(player){
    player.status = !player.status
    this.teamProvider.updatePlayer(player)
  }

  filterplayers(team){
    return this.players.map(x => x.filter(y => y.team === team))
  }
  

  ionViewDidEnter () {
    console.log('ionViewDidLoad GameplayersPage');
    this.filteredPlayers = this.filterplayers(this.chosenTeam)



    
  }


}
