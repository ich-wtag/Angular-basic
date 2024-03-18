import { inject } from "@angular/core";
import {
    ActivatedRoute,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { Observable, map, take } from "rxjs";

export const canActivate = (
    router: ActivatedRoute,
    state: RouterStateSnapshot
):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> => {
    const authService = inject(AuthService);
    const route = inject(Router);

    return authService.user.pipe(
        take(1),
        map((user) => {
            const loggedIn = user ? true : false;

            if (loggedIn) {
                return true;
            } else {
                return route.createUrlTree(["/login"]);
            }
        })
    );
};
