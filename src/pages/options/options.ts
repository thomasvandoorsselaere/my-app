import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersGameProvider } from '../../providers/providers-game/providers-game';
import { Gameoptions } from '../../models/gameoptions';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular/components/app/app';
import { AngularFireAuth } from 'angularfire2/auth';

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
optionCollection : AngularFirestoreCollection<Gameoptions>
optionDoc: AngularFirestoreDocument<Gameoptions>
options: Observable<Gameoptions[]>

  constructor(
    private gameProvider: ProvidersGameProvider,
    public navCtrl: NavController,
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    public app: App,
    public navParams: NavParams) {

      this.options = this.afs.collection('gameoptions').valueChanges()
      this.optionCollection = this.afs.collection('gameoptions')
      
          this.options = this.optionCollection.snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Gameoptions
            data.id = a.payload.doc.id
            return data
          })
        })
  }

  changeToggle(option){
    option.status = !option.status
    this.gameProvider.updateOptions(option)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
    console.log(this.options)
  }

  logout(){
    this.afAuth.auth.signOut().then(()=> {
      this.app.getRootNav().setRoot(LoginPage);
    })
  }

}
