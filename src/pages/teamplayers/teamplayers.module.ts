import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamplayersPage } from './teamplayers';

@NgModule({
  declarations: [
    TeamplayersPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamplayersPage),
  ],
})
export class TeamplayersPageModule {}
