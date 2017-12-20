import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamedetailsPage } from './gamedetails';

@NgModule({
  declarations: [
    GamedetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GamedetailsPage),
  ],
})
export class GamedetailsPageModule {}
