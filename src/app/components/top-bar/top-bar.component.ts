import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthServiceService} from "../../../services/auth-service.service";
import { faPlus, faUser, faRightFromBracket, faRightToBracket, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {SubReddotService} from "../../../services/sub-reddot.service";
import {Subreddot} from "../../../models/subreddot.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{

  mail: string = '';
  search: string = '';
  faPlus = faPlus;
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;
  faRightToBracket = faRightToBracket;
  faChevronRight = faChevronRight;

  subreddots: Array<Subreddot>;
  searchResults: Array<Subreddot> = [];
  focus: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthServiceService,
    private subReddotService: SubReddotService,
    private router: Router,
  ) {
    this.subreddots = [];
  }

  ngOnInit(): void {
    console.log('top bar');
    this.init();
    UserService.getUserAsObservable().subscribe(res => {
      this.init();
    });
    this.getSubReddots();
  }
  init() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser().subscribe(res => {
        // @ts-ignore
        this.mail = res["mail"];
      } );
    }
  }



  getSubReddots() {
    this.subReddotService.getSubReddots().subscribe(res => {
      this.subreddots = res as Array<Subreddot>;
    });
  }

  logout() {
    console.log('logout');
    this.authService.logout();
    this.mail = '';
  }

  searchForSubbreddot() {
    // const subreddots = this.subreddots.filter(subreddot => subreddot.name.includes(this.search));
    // console.log(subreddots);
    this.searchResults = [];
    this.searchResults = this.subreddots.filter(sr => sr.name.toLowerCase().includes(this.search.toLowerCase()))
      .sort((a, b) => {
        const aIndex = a.name.toLowerCase().indexOf(this.search.toLowerCase());
        const bIndex = b.name.toLowerCase().indexOf(this.search.toLowerCase());
        if (aIndex < bIndex) {
          return -1;
        } else if (aIndex > bIndex) {
          return 1;
        } else {
          return 0;
        }
      })
      .slice(0, 5);
    console.log(this.searchResults);
  }

  focusInSearch() {
    this.focus = true;
  }

  focusOutSearch() {
    //make sure the search results are not cleared when clicking on them
    setTimeout(() => {
      this.focus = false;
    }, 100);
  }

}
