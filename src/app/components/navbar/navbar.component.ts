import {ChangeDetectionStrategy, Component, OnInit, VERSION} from '@angular/core';
import { User } from '../../models/user';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'navbar',
  template: `
    <nav>
      <h4>Pokemon v{{ version }}</h4>
      <button *ngIf="isLoggedIn; else notLoggedIn" (click)="logOut()">
        I am {{ user?.name }}, and I like {{ user?.likes }} and dislike
        {{ user?.dislikes }} pokemons / Log Out
      </button>
      <ng-template #notLoggedIn>
        <button (click)="logIn()">Log In</button>
      </ng-template>
    </nav>
  `,
  styles: [
    `
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: hotpink;
        color: white;
      }

      h4 {
        margin: 0;
        font-size: 2rem;
      }

      button {
        background: transparent;
        outline: none;
        border: 1px solid;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        font-family: 'Source Sans Pro';
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{
  version = VERSION.full;
  user: User = {};
  isLoggedIn = false;


  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn = JSON.parse(localStorage.getItem("token"));
    this.user = JSON.parse(localStorage.getItem("token"));
  }


  logIn() {
    // TODO: Please replace with a service call
    this.authService.login().subscribe((res:any) => {
      this.user = res
      localStorage.setItem('token',JSON.stringify(this.user))
    })
    this.router.navigate(["/pokemons"]);
    this.isLoggedIn = true;

  }

  logOut() {
    // TODO: Please replace with a service call
    this.authService.login();
    localStorage.removeItem('token')
    this.router.navigate(["/not-auth"]);
    this.isLoggedIn = false;
  }
}
