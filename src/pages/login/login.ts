import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  async login(user: User){
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(
        value => {
          this.navCtrl.setRoot('HometabPage')
        }
      ).catch(e => {
        this.toast.create({
          message: e.message,
          duration: 3000
        }).present()
      })

    // try{
    //   const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    //   if(result){
    //     this.navCtrl.setRoot('HometabPage')
    //   }
    //   else{
    //     this.navCtrl.setRoot('LoginPage')
    //   }
    // }
    // catch (e){
    //   this.toast.create({
    //     message: e.message,
    //     duration: 3000
    //   }).present()
      
    // }
    
  }

  register(){
    this.navCtrl.push('RegisterPage')
  }


}
