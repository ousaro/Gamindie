import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export const mobileOnlyGuardGuard: CanActivateFn = (route, state) => {
  const breakpointObserver = inject(BreakpointObserver);
  const router = inject(Router);

  return breakpointObserver
    .observe([Breakpoints.Handset,Breakpoints.Medium])  // Handset is typically for mobile-sized screens
    .pipe(
      map(result => {
        if (result.matches) {
          return true; // Allow navigation if on mobile screen
        } else {
          // Handle screen resize: reload the current route if screen size changes
          if (state.url.includes('/chat') || state.url.includes('/notifications') || state.url.includes('/friends-requests')) {
            router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              router.navigate([state.url]); // Navigate to the same route to simulate a "refresh"
            });
          } else {
            // Optionally redirect to another route if not on mobile
            router.navigate(['/']); // or any fallback route
          }
          return false; // Block navigation if not on mobile
        }
      })
    );
};
