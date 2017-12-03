import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameplayersPage } from './gameplayers';

@NgModule({
  declarations: [
    GameplayersPage,
  ],
  imports: [
    IonicPageModule.forChild(GameplayersPage),
  ],
})
export class GameplayersPageModule {}
