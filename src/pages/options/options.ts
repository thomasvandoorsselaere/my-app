import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersGameProvider } from '../../providers/providers-game/providers-game';
import { Gameoptions } from '../../models/gameoptions';

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
options: Gameoptions


  constructor(
    private gameProvider: ProvidersGameProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
    this.gameProvider.getOptions().subscribe(options =>{
      this.options = options[0]
      console.log(options)
    })
  }

}
