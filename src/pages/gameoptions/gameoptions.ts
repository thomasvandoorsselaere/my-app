import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Gameoptions } from '../../models/gameoptions';
import { ProvidersGameProvider } from '../../providers/providers-game/providers-game';

/**
 * Generated class for the GameoptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gameoptions',
  templateUrl: 'gameoptions.html',
})
export class GameoptionsPage {
options: Gameoptions[]

  constructor(
    private gameProvider: ProvidersGameProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  changeToggle(option){
    option.status = !option.status
    this.gameProvider.updateOptions(option)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad GameoptionsPage');
    this.gameProvider.getOptions().subscribe(options =>{
      this.options = options
    })
    console.log(this.options)
  }

}
