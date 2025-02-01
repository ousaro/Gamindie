// src/app/auth/auth.context.ts
import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token/token.service';
import { UserService } from '../../core/services/services';
import { UserResponse } from '../../core/services/models';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthContext {
  private readonly userSignal = signal<UserResponse | null>(null);
  private readonly loadingSignal = signal<boolean>(true);
  private readonly tokenSignal = signal<string | null>(null);

  readonly user = computed(() => this.userSignal());
  readonly isAuthenticated = computed(() => !!this.userSignal());
  readonly isLoading = computed(() => this.loadingSignal());

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService) {
    // Initialize auth state from localStorage
    this.initializeAuth();
  }

  private initializeAuth() {
    const storedToken = this.tokenService.token;
    if (storedToken) {
      this.tokenSignal.set(storedToken);
      this.loadUserProfile();
    } else {
      this.loadingSignal.set(false);
    }
  }

  private async loadUserProfile(): Promise<void> {
    try {
      // Convert Observable to Promise and await the result
      const response = await firstValueFrom(this.userService.getProfile());
      this.userSignal.set(response);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      //await this.logout(); // Clean up on error
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async logout(): Promise<void> {
    this.userSignal.set(null);
    this.tokenSignal.set(null);
    this.tokenService.removeToken();
    window.location.reload();
  }


  hasRole(role: string): void {
    // TODO Implement role checking
  }
}