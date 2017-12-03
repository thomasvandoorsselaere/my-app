import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivegamePage } from './activegame';

@NgModule({
  declarations: [
    ActivegamePage,
  ],
  imports: [
    IonicPageModule.forChild(ActivegamePage),
  ],
})
export class ActivegamePageModule {}
