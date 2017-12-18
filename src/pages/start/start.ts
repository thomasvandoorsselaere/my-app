import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { TeamsPage } from '../teams/teams';
import { OptionsPage } from '../options/options';


/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',

})
export class StartPage {
  tab1Root = StartPage;
  tab2Root = TeamsPage;
  tab3Root = OptionsPage;

  constructor(
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.toast.create({
          message: `Welcome to your Basketball app, ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
          this.toast.create({
            message: `Please Login`,
            duration: 3000
          }).present()
      }
     
    })
    
  }

  newGame(){
    this.navCtrl.push("GamePage")
  }
  
  teams(){
    this.navCtrl.push("TeamsPage")
  }

  history(){
    this.navCtrl.push("HistoryPage")
  }

  options(){
    this.navCtrl.push("OptionsPage")
  }
}
