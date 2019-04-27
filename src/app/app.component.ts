import { Component, ViewChild } from '@angular/core';

import { IonRouterOutlet, Platform, Events, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';

@Component({
  selector       : 'app-root',
  templateUrl    : 'app.component.html'
})
export class AppComponent 
{
    @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
    constructor(
        public router          : Router,
        public events          : Events,
        public alertCtrl       : AlertController,
        public platform        : Platform,
        public splashScreen    : SplashScreen,
        public statusBar       : StatusBar,
        public appMinimize     : AppMinimize
    ) 
    {
        this.initializeApp();
    }

    initializeApp() 
    {
        this.platform.ready().then(() => {
            this.statusBar.backgroundColorByHexString('#787C89');
            this.splashScreen.hide();

            this.events.subscribe('openAlert', (title, msg) => {
                this.openAlert(title, msg);
            });

            this.platform.backButton.subscribeWithPriority(0, 
                () => {
                    if (this.routerOutlet && this.routerOutlet.canGoBack()) 
                    {
                        this.routerOutlet.pop();
                    } 
                    else
                    {
                        this.appMinimize.minimize();                        
                    }
                }
            );
        });
    }

    async openAlert(title, msg)
    {
        let alert = await this.alertCtrl.create({
            header     : title,
            message    : msg,
            buttons   : ['Tutup']
        });
        await alert.present();        
    }
}
