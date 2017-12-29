import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Player } from '../../models/player';

import { Gameoptions } from '../../models/gameoptions';
import { Team } from '../../models/team';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HometabPage } from '../hometab/hometab';
import { Game } from '../../models/game';
import { ProvidersGameProvider } from '../../providers/providers-game/providers-game';
import { GamePlayer } from '../../models/gameplayer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import * as _ from 'lodash';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@IonicPage()
@Component({
  selector: 'page-activegame',
  templateUrl: 'activegame.html',
})
export class ActivegamePage {
  optionCollection: AngularFirestoreCollection<Gameoptions>
  options: Observable<Gameoptions[]>
  playersCollection: AngularFirestoreCollection<Player>
  players: Observable<Player[]>
  team: Team
  filteredPlayers: Observable<Player[]>
  game: any = {}
  public id : number = 0
  models: GamePlayer[] = []


  constructor(
    public renderer: Renderer,
    public navCtrl: NavController,
    public gameProvider: ProvidersGameProvider,
    public afs: AngularFirestore,
    public navParams: NavParams) {

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

  filterplayers(team) {
    return this.players.map(x => x.filter(y => y.team === team))
  }

  submitForm(form: NgForm, game: Game) {
    this.id++
    //adding the game to the db
    this.game.date =  Date.now()
    this.game.name = "Game"+this.id

    this.gameProvider.addGame(this.game)
    


    for (let m in this.models) {
        this.models[m].date = this.game.date
        this.gameProvider.addGamePlayer(this.models[m])
    }
   


    console.log(this.models)
    this.navCtrl.setRoot(HometabPage)
    this.navCtrl.popToRoot()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivegamePage');
    console.log(this.options)
    this.filteredPlayers = this.filterplayers(this.team)
    this.filteredPlayers.subscribe(players => _.forEach(players, (player) => { this.models.push({ name: player.name }) }))

    console.log(this.models)

  }
}
