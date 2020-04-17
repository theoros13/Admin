import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ListPageModule } from '../app/list/list.module'; 
import { ModifiUserPageModule } from '../app/modifi-user/modifi-user.module'; 
import { ViewUserPageModule } from '../app/view-user/view-user.module'; 
import { ScanUserPageModule } from '../app/scan-user/scan-user.module'; 
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatePipe } from '@angular/common';


registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ListPageModule,
    ModifiUserPageModule,
    ViewUserPageModule,
    ScanUserPageModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    StatusBar,
    SplashScreen,
    Diagnostic,
    QRScanner,
    File,
    SocialSharing,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
