import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PathsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getJsonFiles(path) {
    return this.http.get(`${this.baseUrl}/paths`, {
      params: {
        path
      }
    });
  }
}