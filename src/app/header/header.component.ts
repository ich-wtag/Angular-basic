import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../Services/auth.service";
import { User } from "../Model/User";
import { Subscription } from "rxjs";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
    constructor(private authService: AuthService) {}
    isLoggedIn: boolean = false;
    private userSubject: Subscription;

    ngOnInit(): void {
        this.userSubject = this.authService.user.subscribe((data: User) => {
            // console.log(data);

            this.isLoggedIn = data ? true : false;
        });
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSubject.unsubscribe();
    }
}
