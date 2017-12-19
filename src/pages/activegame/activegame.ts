import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Player } from '../../models/player';

import { Gameoptions } from '../../models/gameoptions';
import { Team } from '../../models/team';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HometabPage } from '../hometab/hometab';
import { Game } from '../../models/game';
import { ProvidersGameProvider } from '../../providers/providers-game/providers-game';


@IonicPage()
@Component({
  selector: 'page-activegame',
  templateUrl: 'activegame.html',
})
export class ActivegamePage {
  optionCollection : AngularFirestoreCollection<Gameoptions>
  options: Observable<Gameoptions[]>

  playersCollection: AngularFirestoreCollection<Player>
  players: Observable<Player[]>
  filteredPlayers: Observable<Player[]>

  team: Team
  cardExpanded: boolean= false
  game: Game

  @ViewChild("cc") cardContent:any

  constructor(
    public renderer: Renderer,
    public navCtrl: NavController,
    public gameProvider: ProvidersGameProvider, 
    public afs: AngularFirestore,
    public navParams: NavParams) {

      this.options = this.afs.collection('gameoptions').valueChanges()
      this.optionCollection = this.afs.collection('gameoptions')
      
          this.options = this.optionCollection.snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Gameoptions
            data.id = a.payload.doc.id
            return data
          })
        })
    
        this.playersCollection = this.afs.collection('players')
        this.players = this.playersCollection.snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Player
            data.id = a.payload.doc.id
            return data
          })
        })
  


      this.team = navParams.get("chosenTeam")

  }
  toggleCard(i){
    if(this.cardExpanded){
        this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px")
    } else{
        this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px")
        
    }
    this.cardExpanded = !this.cardExpanded
  }

  filterplayers(team){
    return this.players.map(x => x.filter(y => y.team === team))
  }

  submitGame(game: Game){
    this.gameProvider.addGame(game)

    this.navCtrl.setRoot(HometabPage)
    this.navCtrl.popToRoot()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivegamePage');
    console.log(this.options)
    console.log(this.team)
    this.filteredPlayers = this.filterplayers(this.team)
    
}
} 
