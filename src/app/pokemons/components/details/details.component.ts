import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {BackendService} from "../../../services/backend.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'pokemon-details',
  template: `
    <div class="flex gap-4 items-center justify-center">
      <button (click)="prevId()">
        <<
      </button>
      <pokemon-card [pokemon]="dataDetail"></pokemon-card>
      <button (click)="nextId()">
        >>
      </button>
    </div>

    <div class="flex w-1/3 px-4 justify-between items-center">
      <button class="border border-gray-600 px-4 py-2 rounded" (click)="like()">
        Like
      </button>
      <button
        class="border border-gray-600 px-4 py-2 rounded"
        (click)="dislike()"
      >
        Dislike
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        height: calc(100% - 5rem);
      }
    `
  ]
})
export class DetailsComponent implements OnInit{
  dataDetail: any;
  idCurrent: any;
  user: User = {};
  value: number = 1;
  @HostBinding('class') hostClass =
    'flex flex-col gap-4 items-center justify-center';

  constructor(private backendService: BackendService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getParamId();
  }

  getParamId(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idCurrent = parseInt(params.get('id'));
      if (this.idCurrent) {
        this.getDataDetail(this.idCurrent)
      }
    })
  }

  getDataDetail(id) {
    this.backendService.getPokemonDetail(id).subscribe((res:any) => {
      this.dataDetail = res;
    })
  }

  nextId() {
    // go to next id
    if (this.idCurrent < 10220) {
      this.idCurrent += 1;
      this.getDataDetail(this.idCurrent);
      this.router.navigate(['pokemons', this.idCurrent]);
    }
  }

  prevId() {
    // go to prev id
    if (this.idCurrent > 1) {
      this.idCurrent -= 1;
      this.getDataDetail(this.idCurrent);
      this.router.navigate(['pokemons', this.idCurrent]);
    }
  }

  like() {
    // like
    this.authService.addLikes(this.value);

  }

  dislike() {
    // dislike
    this.authService.addDislikes(this.value);
  }
}
