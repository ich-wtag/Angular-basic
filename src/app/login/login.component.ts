import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { AuthService } from "../Services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @ViewChild("username") userName: ElementRef;

  @ViewChild("password") password: ElementRef;

  auhService: AuthService = inject(AuthService);

  router: Router = inject(Router);

  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  onLoginClicked() {
    const username = this.userName.nativeElement.value;
    const password = this.password.nativeElement.value;

    const user = this.auhService.login(username, password);

    if (user === undefined) {
      alert("User name or Password is incorrect");
    } else {
      alert("Welcome " + user.name + " to the website");

      this.router.navigate(["/Courses"]);
    }
  }

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((query) => {
      const logout = Boolean(query.get("logout"));

      if (logout) {
        this.auhService.logout();
        alert("You are logged out. loggedin = " + this.auhService.isLogged);
      }
    });
  }
}
