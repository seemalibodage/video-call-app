import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
import { User, OtherUser, AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { WebRTCService } from '../../services/webrtc.service';
import { UserPage } from '../user/user';
declare let Peer: any;
@IonicPage()
@Component({
	selector: 'page-page1',
	templateUrl: 'page1.html'
})
export class Page1 {
	myVideo: HTMLMediaElement;
	otherVideo: HTMLMediaElement;

	me: User = {};
	otherUser: OtherUser = new OtherUser();

	constructor(
		private userService: UserService, 
		private authService: AuthService, 
		private webRTCService: WebRTCService,
		private nav: NavController, 
		private elRef: ElementRef, 
		private alertCtrl: AlertController) {

	}

	ngOnInit(): any {
		// Find video elements
		this.myVideo = this.elRef.nativeElement.querySelector('#my-video');
		this.otherVideo = this.elRef.nativeElement.querySelector('#other-video');
		//
		this.start();
	}

	start() {
		const prompt = this.alertCtrl.create({
			title: 'Login',
			message: "Enter phone number",
			inputs: [
				{
					name: 'title',
					placeholder: 'Title'
				},
			],
			buttons: [
				{
					text: 'Cancel',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Save',
					handler: data => {


						this.authService._user = new User();
						this.authService._user.id = data.title;
						this.authService._user.email = "sd@gmail.com";
						this.authService._user.displayName = "S D";
						this.authService._user.profileImageUrl = "";

						this.me = this.authService.user;

						this.webRTCService.createPeer(this.me.id);
						this.webRTCService.init(this.myVideo, this.otherVideo, () => {
							console.log('init done');
						});
						console.log('Saved clicked', data);
					}
				}
			]
		});
		prompt.present();
	}
	getOtherUserName(): string {
		if (this.otherUser.notEmpty()) {
			return this.otherUser.name;
		} else {
			return 'Choose the User to call...';
		}
	}

	chooseOtherUser() {
		console.log('Choose other user');
		// let modal = this.modal.create(UserPage);
		// modal.onDismiss((value: any) => {
		//   console.log('Selected user', value);
		// this.otherUser = value;
		// });
		// this.nav.present(modal);




		const prompt = this.alertCtrl.create({
			title: 'Login',
			message: "Enter a name for this new album you're so keen on adding",
			inputs: [
				{
					name: 'title',
					placeholder: 'Title'
				},
			],
			buttons: [
				{
					text: 'Cancel',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Save',
					handler: data => {
						this.otherUser = new OtherUser(data.title, data.title);
						console.log('Saved clicked', data);
					}
				}
			]
		});
		prompt.present();

	}

	startCall() {
		console.log('Call to ', this.otherUser.id);
		this.webRTCService.call(this.otherUser.id);
	}

	stopCall() {
		console.log('Stop calling to other user', this.otherUser.name);
		this.webRTCService.endCall();
	}
}
