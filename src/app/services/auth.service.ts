import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../models/user";
import {any} from "codelyzer/util/function";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: User = {name: 'Lionel', likes: 0, dislikes: 0};
    userInLocalStorage = JSON.parse(localStorage.getItem('user'));
    public _userSubject = new BehaviorSubject<any>(this.userInLocalStorage)
    userState = this._userSubject.asObservable();
    constructor() {
    }

    addLikes(value) {
        if (this.userInLocalStorage === null) {
            this.user.likes += value;
            this._userSubject.next(this.user)
        } else {
            this.user = this.userInLocalStorage;
            this.user.likes += value;
        }
        localStorage.setItem('user', JSON.stringify(this.user))
    }

    addDislikes(value){
        if (this.userInLocalStorage === null) {
            this.user.dislikes += value;
            this._userSubject.next(this.user)
        } else {
            this.user = this.userInLocalStorage;
            this.user.dislikes += value;
        }
        localStorage.setItem('user', JSON.stringify(this.user))
    }

    login(): Observable<User> {
        return this._userSubject
    }

    isLoggedIn() {
        return !!localStorage.getItem("token");
    }

}
