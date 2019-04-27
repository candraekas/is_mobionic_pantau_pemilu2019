import { Component } from '@angular/core';
import { LoadingController, AlertController, Events, Platform } from '@ionic/angular';

import { PresidenService } from '../service/presiden.service';

@Component({
  	selector	: 'app-tab1',
  	templateUrl	: 'tab1.page.html',
  	styleUrls	: ['tab1.page.scss'],
})
export class Tab1Page 
{
	data = {
		ts		: "",
		chart	: {},
		table	: {},
		progress: {
			total	: 0,
			proses	: 0
		}
	}

	presentase = {
		"calon_01"	: "0",
		"calon_02"	: "0",
		"progress"	: ""
	}

	total_keseluruhan   = 0;
	terakhir_update		= '';

	constructor(
		public events		: Events,
		public presidenSvc 	: PresidenService,
		public loadingCtrl	: LoadingController,
		public alertCtrl	: AlertController,
		public platform		: Platform
	)
	{
		if(this.platform.is('cordova'))
		{
			this.getData();
		}
	}

	async getData()
	{		
 		const loading = await this.loadingCtrl.create({
      		message		: 'Memuat data ...',
      		duration	: 2000
    	});
    	await loading.present();
    	
    	this.presidenSvc.getData().then(
    		data => {
	    		loading.dismiss()
	    		if(this.presidenSvc.getDataResult.status == 200)
	    		{
	    			this.data = JSON.parse(this.presidenSvc.getDataResult.data);
		
					let waktu_update = new Date(this.data.ts);
					this.terakhir_update = waktu_update.setHours(waktu_update.getHours() + 7).toString(); 		

	    			this.total_keseluruhan = parseInt(this.data.chart["21"]) + parseInt(this.data.chart["22"]);
	    			this.presentase.calon_01 = Number(parseInt(this.data.chart["21"]) / this.total_keseluruhan * 100).toFixed(2);
	    			this.presentase.calon_02 = Number(parseInt(this.data.chart["22"]) / this.total_keseluruhan * 100).toFixed(2);

	    			this.presentase.progress = Number(this.data.progress.proses / this.data.progress.total * 100).toFixed(2)
	    		}
	    		else
	    		{
		    		this.events.publish('openAlert', 'Informasi', 'Gagal memuat data.');
	    		}
    		},
    		error => {
	    		loading.dismiss();
	    		this.events.publish('openAlert', 'Kesalahan', 'Gagal memuat data. (Err 1)');
    		}
    	).catch(error => {
    		loading.dismiss()
    		this.events.publish('openAlert', 'Kesalahan', 'Gagal memuat data. (Err 2)');
    	});
	}
}
