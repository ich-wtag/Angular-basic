import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../Services/auth.service";
import { Observable } from "rxjs";
import { AuthResponse } from "../Model/AuthResponse";
import { Route, Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent {
    isLogginMode: boolean = true;
    isLoading: boolean = false;
    errorMessage: string | null = null;
    authObs: Observable<AuthResponse>;

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isLogginMode = !this.isLogginMode;
    }

    onFormSubmitted(form: NgForm) {
        const { email, password } = form.value;
        if (this.isLogginMode) {
            this.authObs = this.authService.login(email, password);
        } else {
            this.isLoading = true;
            this.authObs = this.authService.signUp(email, password);
        }

        this.authObs.subscribe({
            next: (value) => {
                this.isLoading = false;
                this.router.navigate(["/dashboard/overview"]);
            },
            error: (errMsg) => {
                this.errorMessage = errMsg;
                this.isLoading = false;

                this.hideSnackbar();
            },
        });

        form.reset();
    }
    hideSnackbar() {
        setTimeout(() => {
            this.errorMessage = null;
        }, 3000);
    }
}
