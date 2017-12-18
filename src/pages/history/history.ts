import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProvidersGameProvider } from '../../providers/providers-game/providers-game';
import { Game } from '../../models/game';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})

export class HistoryPage {
  games: Game[]
  constructor(
    private gameProvide: ProvidersGameProvider,
    public navCtrl: NavController,
    public modelCtrl:  ModalController,
    public navParams: NavParams) {
  }

  startnewgame(){
    let modal = this.modelCtrl.create(" ")
    modal.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    
    this.gameProvide.getHistory().subscribe(game =>{
      this.games = game
    })

    console.log(this.games)
  }

}
