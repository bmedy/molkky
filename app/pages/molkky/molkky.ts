import {Page, NavController} from 'ionic-angular';
import _ from 'lodash';

@Page({
    templateUrl: 'build/pages/molkky/molkky.html'
})
export class MolkkyPage {

    public userList: Array<Object>;

    constructor(private nav: NavController) {
        this.userList = JSON.parse(localStorage.getItem("users"));
        if(!this.userList) {
            console.error("User list must not be empty");
        }
    }

    generate(){
      _.forEach()
    }

    done() {

    }

}

class UserInGame {
  private username: string;
  private score: number;
  private rounds: Array<MolkkyModel>;

  constructor(username: string){
    this.username = username;
    this.score = 0;
  }



}

class MolkkyModel {
  private name: number;
  private state: boolean;

  constructor(name: number){
    this.state = false;
    this.name = name;
  }

  down(){
    this.state = true;
  }
}
