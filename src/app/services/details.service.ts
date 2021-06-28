import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  public sendId = new BehaviorSubject(0)

  constructor() { }
}
