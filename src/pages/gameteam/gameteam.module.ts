import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameteamPage } from './gameteam';

@NgModule({
  declarations: [
    GameteamPage,
  ],
  imports: [
    IonicPageModule.forChild(GameteamPage),
  ],
})
export class GameteamPageModule {}
