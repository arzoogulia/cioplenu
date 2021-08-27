import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  clickData: string;

  constructor() {
  }

  setClickData(data) {
    this.clickData = data;
  }

  getClickData() {
    return this.clickData;
  }
}
