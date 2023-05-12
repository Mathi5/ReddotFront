import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router
    ) {
  }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null) {
        console.log('okay');
        return true;
    } else {
        console.log('pas okay');
        this.router.navigate(['/login'])
        return false
    }
}
  
}
