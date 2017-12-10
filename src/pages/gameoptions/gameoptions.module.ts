import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameoptionsPage } from './gameoptions';

@NgModule({
  declarations: [
    GameoptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(GameoptionsPage),
  ],
})
export class GameoptionsPageModule {}
