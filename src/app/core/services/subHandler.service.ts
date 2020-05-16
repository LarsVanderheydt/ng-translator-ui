import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SubHandlerService implements OnDestroy {
  private subscriptions: BehaviorSubject<any>[] = [];

  constructor(private http: HttpClient) { }

  public handleDestroy(obs$) {
    this.subscriptions.push(obs$);
    return obs$;
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach((obs: BehaviorSubject<any>) => obs.unsubscribe())
  }
}