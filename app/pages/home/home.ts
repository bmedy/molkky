import {Page, NavController} from 'ionic-angular';
import { BLE } from 'ionic-native';
import {UsersPage} from '../users/users';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  logs: Array<any>;
  devices: Array<any>;
  characteristics: Array<any>;
  isScanning: boolean;
  connecting: boolean;
  connected: boolean;

  constructor(private navCtrl: NavController) {
    this.logs = ["start"];
    this.devices = [];
    this.isScanning = false;
    this.connecting = false;
    this.connected = false;

    BLE.isEnabled().then(()=>{
      console.error("BLE is enabled");
      this.logs.push("BLE is enabled");
      this.startScanning();
    },(e)=>{
      console.error(e);
      this.logs.push(e);
    });
  }

  users() {
    this.navCtrl.push(UsersPage);
  }

  startScanning() {
    console.log("Scanning Started");
    this.logs.push("Scanning Started");
    this.devices = [];
    this.isScanning = true;
   
    BLE.startScan([]).subscribe(device => {
      this.devices.push(device);
    });
  
    setTimeout(() => {
      BLE.stopScan().then(() => {
        console.log("Scanning has stopped");
        this.logs.push("Scanning has stopped");
        console.log(JSON.stringify(this.devices))
        this.logs.push(JSON.stringify(this.devices))
        this.isScanning = false;
      });
    }, 3000);

  }

  connect(deviceID) {
    this.characteristics = [];

    BLE.connect(deviceID).subscribe(peripheralData => {
      console.log(peripheralData.characteristics);
      this.logs.push(peripheralData.characteristics);
      this.characteristics = peripheralData.characteristics;
      this.connecting = false;
      this.connected = true;
    },
    peripheralData => {
      console.log("disconnected");
      this.logs.push("disconnected");
      this.connected = false;
    });
  }

}
