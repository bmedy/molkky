import {Page, NavController} from 'ionic-angular';
import {AddPage} from "../add/add";
import {MolkkyPage} from "../molkky/molkky";

@Page({
    templateUrl: 'build/pages/users/users.html'
})
export class UsersPage {

    public userList: Array<string> = [];

    constructor(private nav: NavController) { }

    onPageDidEnter() {
        this.userList = JSON.parse(localStorage.getItem("users"));
    }

    delete(index: number) {
        this.userList.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(this.userList));
    }

    start() {
        this.nav.push(MolkkyPage);
    }

    add() {
        this.nav.push(AddPage);
    }

}
