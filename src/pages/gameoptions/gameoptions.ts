import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Gameoptions } from '../../models/gameoptions';
import { ProvidersGameProvider } from '../../providers/providers-game/providers-game';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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
  optionCollection : AngularFirestoreCollection<Gameoptions>
  optionDoc: AngularFirestoreDocument<Gameoptions>
  options: Observable<Gameoptions[]>

  constructor(
    private gameProvider: ProvidersGameProvider,
    public navCtrl: NavController, 
    public afs: AngularFirestore,
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
    console.log('ionViewDidLoad GameoptionsPage');
    console.log(this.options)
  }

}
