import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {BackendService} from "../../../services/backend.service";
import {DetailsService} from "../../../services/details.service";

@Component({
  selector: 'pokemon-details',
  template: `
    <div class="flex gap-4 items-center justify-center">
      <button (click)="prevId()">
        <<
      </button>
      <pokemon-card [pokemon]="null"></pokemon-card>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        height: calc(100% - 5rem);
      }
    `
  ]
})
export class DetailsComponent implements OnInit{
  @HostBinding('class') hostClass =
    'flex flex-col gap-4 items-center justify-center';

  constructor(private backendService: BackendService,
              private detailsService: DetailsService ) {
  }

  ngOnInit() {
    this.getDataDetail()
  }

  getDataDetail(){
    this.detailsService.sendId.subscribe((valueId:any) => {
      this.backendService.getPokemonDetail(valueId).subscribe((res:any) => {
        console.log(res)
      })
    })

  }

  nextId() {
    // go to next id
  }

  prevId() {
    // go to prev id
  }

  like() {
    // like
  }

  dislike() {
    // dislike
  }
}
