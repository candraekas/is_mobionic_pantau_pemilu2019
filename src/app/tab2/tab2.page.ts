import { Component } from '@angular/core';
import { NavController, Events } from '@ionic/angular';

import { TentangPage } from '../tentang/tentang.page';

@Component({
	selector	: 'app-tab2',
  	templateUrl	: 'tab2.page.html',
  	styleUrls	: ['tab2.page.scss']
})
export class Tab2Page 
{
	constructor(
		public events 	: Events,
		public navCtrl	: NavController
	)
	{

	}

	openUnderConstruction()
	{
		this.events.publish('openAlert', 'Informasi', 'Masih dalam pengembangan.');
	}

	openTentang()
	{
		this.navCtrl.navigateForward('tentang');
	}
}
