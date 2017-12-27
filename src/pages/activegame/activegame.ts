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
  game: any = {

  }

  model: GamePlayer = {}
  models = [
    {
      name: "",
      points: "",
      rebounds: "",
      assists: "",
      steals: "",
      blocks: "",
      turnovers: ""
    }
  ]

  gamePlayers: Player[]

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
    this.model.date = new Date()
    this.game.date = this.model.date
    this.game.name = "Game"
    this.gameProvider.addGame(this.game)

    
    this.gameProvider.addGamePlayer(this.model)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivegamePage');
    console.log(this.options)
    this.filteredPlayers = this.filterplayers(this.team)
  }
}




  // getPlayer(playerId){
  //   this.playerDoc = this.afs.doc('players/'+playerId)
  //   this.player = this.playerDoc.valueChanges()
  // }





        // _.forEach(this.players, (player) => { this.gameplayers.push({name:player.name})})
        // _.forEach(this.players, (player) => {
        //   console.log(player.name)
        //   this.gameplayers.push({name: player.name})

        // } )

        // this.options.subscribe((options) =>{
        //   _.forEach(this.players, (player) => {player.options = options})
        // });



    // _.forEach(this.gameplayers, function(player){
    //   console.log(player.name)
    // })
