import {Page, NavController} from 'ionic-angular';
import {AddPage} from "../add/add";

@Page({
    templateUrl: 'build/pages/users/users.html'
})
export class UsersPage {

    public userList: Array<string>;

    constructor(private nav: NavController) { }

    onPageDidEnter() {
        this.userList = JSON.parse(localStorage.getItem("users"));
        if(!this.userList) {
            this.userList= [];
        }
    }

    delete(index: number) {
        this.userList.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(this.userList));
    }

    start() {
        this.nav.push(AddPage);
    }

    add() {
        this.nav.push(AddPage);
    }

}
