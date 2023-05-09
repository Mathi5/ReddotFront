import { Component } from '@angular/core';
import {PostServiceService} from "../services/post-service.service";
import {SubReddotService} from "../services/sub-reddot.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectNodeFront';

  constructor(
    private postService: PostServiceService,
    private subReddotService: SubReddotService,
  ) { }

  ngOnInit(): void {
    // this.subReddotService.getSubReddots().subscribe(res => {
    //   console.log(res);
    // });
  }
}
