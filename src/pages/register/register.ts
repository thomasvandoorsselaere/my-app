import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth} from "angularfire2/auth"

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(
    private afAuth:AngularFireAuth,
    public navCtrl: NavController,
    private toast: ToastController,
    public navParams: NavParams) {
  }

  async register(user: User){
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
      value => {
        this.navCtrl.setRoot('LoginPage')
      }
    ).catch(e => {
      this.toast.create({
        message: e.message,
        duration: 3000
      }).present()
    })
  }

}
