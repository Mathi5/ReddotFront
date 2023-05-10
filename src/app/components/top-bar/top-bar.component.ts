import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{

  mail: string = '';
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log('top bar');
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser().subscribe(res => {
        // @ts-ignore
        this.mail = res["mail"];
      } );
    }
  }
}
