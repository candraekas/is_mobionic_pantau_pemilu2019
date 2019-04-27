import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
	providedIn: 'root'
})

export class PresidenService 
{
	base_url = 'https://pemilu2019.kpu.go.id';
	getDataResult = {
		status	: 0,
		data	: ''
	}

	constructor(public http: HTTP) 
	{ 
	}

	getData()
	{
  		return new Promise(resolve => {
			this.http.setHeader(this.base_url, 'Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3');
			this.http.setHeader(this.base_url, 'Host', this.base_url);
			this.http.setSSLCertMode("nocheck");
			this.http.get(this.base_url + '/static/json/hhcw/ppwp.json', {}, {}).then(data => {
				this.getDataResult.status = data.status;
				this.getDataResult.data   = data.data;
				resolve(this.getDataResult);
			})
	  		.catch(error => {
				this.getDataResult.status = error.status;
				this.getDataResult.data   = error.data;
				resolve(this.getDataResult);
			});		
  		});
	}
}
