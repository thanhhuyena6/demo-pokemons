import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {any} from "codelyzer/util/function";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly authenSubject = new BehaviorSubject<User>({});
    readonly authen = this.authenSubject.asObservable();

    private  userSubject = new BehaviorSubject<User>({name: 'Lionel', likes: 0, dislikes: 0});

    constructor(private http: HttpClient,
                private router: Router,) {
    }

    login(): Observable<User>{
        return this.userSubject
    }

    isLoggedIn() {
        return !!localStorage.getItem("token");
    }

}
