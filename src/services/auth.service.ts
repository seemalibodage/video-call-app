import {Inject, Injectable} from '@angular/core';


export class User {
    displayName?: string;
    email?: string;
    id?: string;
    profileImageUrl?: string;
}

export class OtherUser {
    constructor(public name: string = '', public id: string = '') {}

    notEmpty(): boolean {
        return this.name && this.id && this.name.length > 0 && this.id.length > 0;
    }
}

@Injectable()
export class AuthService {

    public _user: User;

    public get user(): User {
        return this._user;
    }

    otherUser: OtherUser;


    constructor() {
     }
    login() {}
}
