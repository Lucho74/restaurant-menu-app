import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const onlyPublicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);
  if (authService.token) {
    const id = authService.getIdFromToken();
    const redirectPath = router.parseUrl("my-restaurant/" + id);
    return new RedirectCommand(redirectPath, {
      skipLocationChange: true,
    });
  }
  return true;
};
