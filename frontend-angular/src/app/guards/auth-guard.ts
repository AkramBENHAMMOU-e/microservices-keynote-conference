import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  const requiredRoles: string[] = route.data['roles'];
  const requiresAuth = route.data['requiresAuth'] === true;

  // Routes only requiring authentication (no specific roles)
  if (requiresAuth && (!requiredRoles || requiredRoles.length === 0)) {
    if (authenticated) return true;
    const router = inject(Router);
    return router.parseUrl('/home');
  }

  if (!requiredRoles || requiredRoles.length === 0) {
    return false;
  }

  // ----- 2) Vérifier si l'utilisateur possède les rôles (realm OU client) -----
  const hasRole = (role: string): boolean => {
    const hasRealmRole = (grantedRoles.realmRoles || []).includes(role);
    const hasResourceRole = Object.values(grantedRoles.resourceRoles || {}).some((roles) =>
      roles.includes(role)
    );
    return hasRealmRole || hasResourceRole;
  };

  const hasRequiredRole = requiredRoles.some((r) => hasRole(r));

  if (authenticated && hasRequiredRole) {
    return true;
  }

  // ----- 3) Redirection vers /home -----
  const router = inject(Router);
  return router.parseUrl('/home');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
