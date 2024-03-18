import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponse } from "../Model/AuthResponse";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "../Model/User";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}
    errorMes: string | null = null;
    user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    private tokenExpireTimer: any;

    signUp(email, password) {
        const data = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        return this.http
            .post<AuthResponse>(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYkkNOGkgc79MtA0n_qwIFaWvSfell8WY",
                data
            )
            .pipe(
                catchError(this.handleError),
                tap((res) => {
                    this.handleCreateUSer(res);
                })
            );
    }

    login(email, password) {
        const data = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        return this.http
            .post<AuthResponse>(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYkkNOGkgc79MtA0n_qwIFaWvSfell8WY",
                data
            )
            .pipe(
                catchError(this.handleError),
                tap((res) => {
                    this.handleCreateUSer(res);
                })
            );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(["/login"]);
        localStorage.removeItem("user");
        if (this.tokenExpireTimer) {
            clearTimeout(this.tokenExpireTimer);
        }
        this.tokenExpireTimer = null;
    }

    autoLogIn() {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            return;
        }

        const loggedUser = new User(
            user.email,
            user.id,
            user._token,
            user._expiresIn
        );

        if (loggedUser.token) {
            this.user.next(loggedUser);

            const timerValue =
                new Date(user?._expiresIn).getTime() - new Date().getTime();
            this.autoLogout(timerValue);
        }
    }

    autoLogout(expireTime: number) {
        this.tokenExpireTimer = setTimeout(() => {
            this.logout();
        }, expireTime);
    }

    private handleCreateUSer(res) {
        const expireInTs = new Date().getTime() + +res.expiresIn * 1000;

        const expireIn = new Date(expireInTs);
        const user = new User(res.email, res.localId, res.idToken, expireIn);

        this.user.next(user);
        this.autoLogout(res.expiresIn * 1000);

        localStorage.setItem("user", JSON.stringify(user));
    }

    private handleError(err) {
        let errorMessage = "An unknown error occured.";
        console.log(err);

        if (!err.error || !err.error.error) {
            return throwError(() => errorMessage);
        }
        switch (err.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = "This email is already exists.";
                break;

            case "OPERATION_NOT_ALLOWED":
                errorMessage = "This operation is not allowed.";
                break;
            case "INVALID_LOGIN_CREDENTIALS":
                errorMessage = "This email or password is not correct.";
                break;

            default:
                break;
        }
        return throwError(() => errorMessage);
    }
}
