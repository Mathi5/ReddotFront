import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  url = 'http://localhost:3000/';

  constructor() { }
}
