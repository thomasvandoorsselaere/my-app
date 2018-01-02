import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Player } from '../../models/player';

import { Gameoptions } from '../../models/gameoptions';
import { Team } from '../../models/team';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HometabPage } from '../hometab/hometab';
import { Game } from '../../models/game';
import { ProvidersGameProvider } from '../../providers/providers-game/providers-game';
import { GamePlayer } from '../../models/gameplayer';
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
  models: GamePlayer[] = []
  gameOptionPoints: Observable<Gameoptions[]>
  gameOptionAssists: Observable<Gameoptions[]>
  gameOptionRebounds: Observable<Gameoptions[]>
  gameOptionSteals: Observable<Gameoptions[]>
  gameOptionBlocks: Observable<Gameoptions[]>
  gameOptionTurnovers: Observable<Gameoptions[]>
  gameOptionFouls: Observable<Gameoptions[]>
  shownGroup = null;


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

  getDate() {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    let formattedDate = day + "-" + month + "-" + year
    return formattedDate
  }

  filterOptions() {
    this.gameOptionPoints = this.options.map(x => x.filter(y => y.name === "points"))
    this.gameOptionAssists = this.options.map(x => x.filter(y => y.name === "assists"))
    this.gameOptionRebounds = this.options.map(x => x.filter(y => y.name === "rebounds"))
    this.gameOptionSteals = this.options.map(x => x.filter(y => y.name === "steals"))
    this.gameOptionBlocks = this.options.map(x => x.filter(y => y.name === "blocks"))
    this.gameOptionTurnovers = this.options.map(x => x.filter(y => y.name === "turnovers"))
    this.gameOptionFouls = this.options.map(x => x.filter(y => y.name === "fouls"))
  }

  submitForm(form: NgForm, game: Game) {

    //adding the game to the db
    this.game.gameId = Date.now()
    this.game.name = "Game " + this.team + " " + this.getDate()
    this.game.date = this.getDate()
    this.gameProvider.addGame(this.game)


    //adding players to the db
    for (let m in this.models) {
      if (this.models[m].status === true) {
        this.models[m].gameId = this.game.gameId
        this.gameProvider.addGamePlayer(this.models[m])
      }
    }

    //navigate back to start page
    this.navCtrl.setRoot(HometabPage)
    this.navCtrl.popToRoot()
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }

  close(){
    this.navCtrl.setRoot(HometabPage)
    this.navCtrl.popToRoot()
  }

//increase decrease points
  increasePoints(index){
    this.models[index].points++
  }

  decreasePoints(index){
    this.models[index].points--
  }

//increase decrease rebounds
  increaseRebounds(index){
    this.models[index].rebounds++
  }

  decreaseRebounds(index){
    this.models[index].rebounds--
  }

  //increase decrease assists
  increaseAssists(index){
    this.models[index].assists++
  }

  decreaseAssists(index){
    this.models[index].assists--
  }

  //increase decrease steals
  increaseSteals(index){
    this.models[index].steals++
  }

  decreaseSteals(index){
    this.models[index].steals--
  }

  //increase decrease blocks
  increaseBlocks(index){
    this.models[index].blocks++
  }

  decreaseBlocks(index){
    this.models[index].blocks--
  }

  //increase decrease turnovers
  increaseTurnovers(index){
    this.models[index].turnovers++
  }

  decreaseTurnovers(index){
    this.models[index].turnovers--
  }

  //increase decrease faults
  increaseFouls(index){
    this.models[index].fouls++
  }

  decreaseFouls(index){
    this.models[index].fouls--
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivegamePage');
    console.log(this.options)
    this.filteredPlayers = this.filterplayers(this.team)
    this.filteredPlayers.subscribe(players => _.forEach(players, (player) => { this.models.push({ name: player.name, status: player.status, points: null, rebounds: null, assists: null, steals: null, blocks: null, turnovers:null, fouls:null }) }))
    this.filterOptions()

  }
}
