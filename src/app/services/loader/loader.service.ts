import { Injectable } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = new Subject<boolean>();
  /**
    * We can either:
    * - Show the loader at the start of each navigation, and hide it in each component (better for dynamic pages as you only need to shut the loader down)
    * - Manage in which components we want the loader (better for static pages as they don't need loading)
  */
  constructor(private router: Router) {
    /* this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart) {
        this.show();
      }
    }); */
  }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
