import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { AuthService, User, OtherUser } from '../../services/auth.service';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private authService: AuthService,
    private viewCtrl: ViewController) {
    this.me = authService.user;
    // this.users = userService.asList();
  }


  me: User;
  users: any;

  chooseUser(user: any) {
    console.log('Choose user', user);
    this.viewCtrl.dismiss(new OtherUser(user.$value, user.$key));
  }

}
