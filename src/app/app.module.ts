import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2'
import { AngularFireAuthModule } from "angularfire2/auth"
import { AngularFirestoreModule } from "angularfire2/firestore"
import { FormsModule } from "@angular/forms"
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { ProvidersTeamsProvider } from '../providers/providers-teams/providers-teams';
import { ProvidersGameProvider } from '../providers/providers-game/providers-game';
import { TeamplayersPage } from '../pages/teamplayers/teamplayers';
import { GameteamPage } from '../pages/gameteam/gameteam';
import { GamedetailsPage } from '../pages/gamedetails/gamedetails';



@NgModule({
  declarations: [
    MyApp,
    TeamplayersPage,
    GameteamPage,
    GamedetailsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    IonicPageModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TeamplayersPage,
    GameteamPage,
    GamedetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvidersTeamsProvider,
    ProvidersGameProvider,
    
  ]
})
export class AppModule {}
