import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { BluetoothSerial } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  state: number;
  serial: any;
  constructor(private navCtrl: NavController) {
    this.serial = BluetoothSerial.list();
    this.state = 0;
  }

  toggleLED(){
    //
    this.state = this.state == 0 ? 1 : 0;
    //this.serial.write(this.state);
    console.log('toggleLED : '+this.state);
  }

}
