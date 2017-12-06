import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersTeamsProvider } from '../../providers/providers-teams/providers-teams';
import { Player } from '../../models/player';
import { ProvidersGameProvider } from '../../providers/providers-game/providers-game';
import { Gameoptions } from '../../models/gameoptions';

/**
 * Generated class for the ActivegamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activegame',
  templateUrl: 'activegame.html',
})
export class ActivegamePage {
  players: Player[]
  options: Gameoptions[]
  cardExpanded: boolean= false
  @ViewChild("cc") cardContent:any

  constructor(
    public renderer: Renderer,
    private gameProvider: ProvidersGameProvider,
    private teamProvider: ProvidersTeamsProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  toggleCard(){
    if(this.cardExpanded){
        this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "0px")
    } else{
        this.renderer.setElementStyle(this.cardContent.nativeElement, "max-height", "500px")
        
    }
    this.cardExpanded = !this.cardExpanded
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivegamePage');
    this.teamProvider.getPlayers().subscribe(players => {
      this.players = players
  })
  this.gameProvider.getOptions().subscribe(options =>{
    this.options = options
  })
}
}
