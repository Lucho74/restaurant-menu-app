import { inject } from '@angular/core';
import { CanActivateChildFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const onlyRestaurantGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);
  if(!authService.token){
  const redirectPath = router.parseUrl("/login");
    return new RedirectCommand(redirectPath, {
      skipLocationChange: true,
    })
  };
  return true;
};
