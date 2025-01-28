import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService); // Use the inject function to get the AuthService
  const router = inject(Router); // Use the inject function to get the Router

  if (tokenService.isAuthenticated()) {
    return true; // Allow navigation if authenticated
  }

  // Redirect to auth page if not authenticated
  router.navigate(['/auth/']);
  return false;
};

export const guestGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService); // Use the inject function to get the AuthService
  const router = inject(Router); // Use the inject function to get the Router

  if (!tokenService.isAuthenticated()) {
    return true; // Allow navigation if authenticated
  }

  // Redirect to auth page if not authenticated
  router.navigate(['/home/']);
  return false;
};
