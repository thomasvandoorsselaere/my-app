import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the HometabPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hometab',
  templateUrl: 'hometab.html'
})
export class HometabPage {

  gamesRoot = 'GamesPage'
  teamsRoot = 'TeamsPage'
  optionsRoot = 'OptionsPage'


  constructor(public navCtrl: NavController) {}

}
