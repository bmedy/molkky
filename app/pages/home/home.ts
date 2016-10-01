import {Page, NavController} from 'ionic-angular';
import { BluetoothSerial } from 'ionic-native';
import {UsersPage} from '../users/users';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  state: string;
  availableDevice: any;
  constructor(private navCtrl: NavController) {
    
    BluetoothSerial.list().then(a => {
      console.log('devices : ',a);
      this.availableDevice = a;
    });
  }
  
  send(){
    console.log(this.state);
  }

  users(){
      this.navCtrl.push(UsersPage);
  }

}
