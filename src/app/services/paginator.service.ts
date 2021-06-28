import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  public paginator = new BehaviorSubject(0)

  constructor() { }
}
