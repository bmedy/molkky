import {Page, NavController} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/add/add.html'
})
export class AddPage {

    public userList: Array<string>;
    public userItem: string;

    constructor(private nav: NavController) {
        this.userList = JSON.parse(localStorage.getItem("users"));
        if(!this.userList) {
            this.userList = [];
        }
        this.userItem = "";
    }

    save() {
        if(this.userItem != "") {
            this.userList.push(this.userItem);
            localStorage.setItem("users", JSON.stringify(this.userList));
            this.nav.pop();
        }
    }

}
