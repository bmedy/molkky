import {Page, NavController, AlertController, ItemSliding} from 'ionic-angular';
import * as _ from 'lodash';

@Page({
  templateUrl: 'build/pages/molkky/molkky.html'
})
export class MolkkyPage {

  public userList: Array<UserInGame>;
  public skittles: Array<MolkkyModel> = [];
  public currentPlayer: number;

  constructor(private nav: NavController, private alertCtrl: AlertController) {
    this.userList = [];
    this.init();
  }

  init(){
    _.each(JSON.parse(localStorage.getItem("users")),(username) => {
      this.userList.push(new UserInGame(username));
    });
  }
  
  gameInProgress() {
    return _.isNumber(this.currentPlayer);
  }
  
  startGame(){
    this.userList.map(user => user.reset());
    this.generateRound();
    this.currentPlayer = 0;
  }
  
  endGame(user){
    let toast = this.alertCtrl.create({
      title: `winner ${user.username}`,
      subTitle:`score ${user.score}`,
      buttons: ['Ok']
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      this.startGame();
    });

    toast.present();
    console.log(`winner ${user.username} with score ${user.score}`);
  }

  generateRound(){
    console.log('generate round');
    this.skittles.splice(0);
    _.times(12, (i) => {
      this.skittles.push(new MolkkyModel(i+1));
    });
  }
  
  getFail(number){
    return Array(number).fill(1).map((x,i)=>i);
  }
  
  nextPlayer(){
    if(this.currentPlayer === this.userList.length - 1){
      this.currentPlayer = 0;
    }else {
      this.currentPlayer++;
    }
    if(this.userList[this.currentPlayer].fail === 3){
      this.nextPlayer();
    }
  }

  done() {
    let lastScore = this.userList[this.currentPlayer].score;
    this.userList[this.currentPlayer].endRound(this.skittles);
    if(this.userList[this.currentPlayer].score === 50){
      this.endGame(this.userList[this.currentPlayer]);
      return;
    }
    if(this.isLastPlayer()){
      this.endGame(this.userList.filter(x => x.fail !== 3)[0]);
      return;
    }    
    if(lastScore > this.userList[this.currentPlayer].score){
      console.log(`bad`)
    }
    this.nextPlayer();
    this.generateRound();
  }
  
  isLastPlayer(){
    return (this.userList.length - this.userList.filter(x => x.fail === 3).length) < 2;
  }

  down(item: ItemSliding, skittle: MolkkyModel) {
    skittle.state = true;
    item.close();
  }
  
  up(item: ItemSliding, skittle: MolkkyModel) {
    skittle.state = false;
    item.close();
  }

}

class UserInGame {
  private _username: string;
  score: number;
  rounds: Array<Array<MolkkyModel>>;
  fail: number;

  constructor(username: string){
    this._username = username;
    this.score = 0;
    this.rounds = [];
    this.fail = 0;
  }

  get username(): string {
    return this._username;
  }
  
  reset(){
    this.score = 0;
    this.fail = 0;
    this.rounds.splice(0,this.rounds.length);
  }

  endRound(skittles: Array<MolkkyModel>){
    this.rounds.push(skittles);
    let res = this.calc(skittles);
    if(res === 0){
        this.fail++;
    }else{
      this.score += res;
      this.fail = 0;
      if(this.score > 50){
        this.score = 25;
      }  
    }
  }
  
  
  private calc(round: Array<MolkkyModel>){
    let down = round.filter(a=>a.state).map(a=>a.name);
    if (down.length === 1){
      return down[0];
    }else{
      return down.length;
    }
  }
}

class MolkkyModel {
  name: number;
  state: boolean;

  constructor(name: number){
    this.state = false;
    this.name = name;
  }

  down(){
    this.state = true;
  }
}
