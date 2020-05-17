import { SubHandlerService } from './../core/services/subHandler.service';
import { PathsService } from './../core/services/paths.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [SubHandlerService]
})
export class HomeComponent implements OnInit {

  constructor(
    public pathsService: PathsService,
  ) { }

  ngOnInit(): void {

  }
}
