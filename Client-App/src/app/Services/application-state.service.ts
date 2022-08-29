import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApplicationStateService {

  private _isMobileResolution: boolean;

  // TODO: Set as an observable and watch for it in app.component.ts and set the class
  private _darkMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public darkMode$: Observable<boolean> = this._darkMode.asObservable();

  isDarkMode = () => this._darkMode.value;

  setDarkMode(darkMode: boolean){
    if(this._darkMode.value !== darkMode){
      this._darkMode.next(darkMode);
    }
  }

  constructor() {
    if (window.innerWidth < 768) {
      this._isMobileResolution = true;
    } else {
      this._isMobileResolution = false;
    }

    // Detect default theme    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setDarkMode(true);
    }
  }

  public get isMobileResolution(): boolean {
    return this._isMobileResolution;
  }
}