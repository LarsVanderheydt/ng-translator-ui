import { Injectable } from '@angular/core';

const MAIN_DIRECTORY = 'MAIN_DIRECTORY';

@Injectable({providedIn: 'root'})
export class LocalstorageService {

  public setMainDirectory(path?) {
    if (!path) localStorage.removeItem(MAIN_DIRECTORY);
    else localStorage.setItem(MAIN_DIRECTORY, path);
  }

  public getMainDirectory() {
    return localStorage.getItem(MAIN_DIRECTORY);
  }
}