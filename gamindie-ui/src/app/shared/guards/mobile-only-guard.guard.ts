import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export const mobileOnlyGuardGuard: CanActivateFn = (route, state) => {
  const breakpointObserver = inject(BreakpointObserver);
  const router = inject(Router);

  return breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Small]) 
    .pipe(
      map(result => {
        if (result.matches) {
          return true; // Allow navigation if on mobile screen
        } else {
          router.navigateByUrl("/"); // Redirect to home if not on mobile
          return false; // Block navigation if not on mobile
        }
      })
    );
};
