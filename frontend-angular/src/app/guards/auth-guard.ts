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

  // ----- 1) Récupérer les rôles attendus -----
  const requiredRoles: string[] = route.data['roles']; // ✔ ici le correct

  if (!requiredRoles || requiredRoles.length === 0) {
    return false;
  }

  // ----- 2) Vérifier si l'utilisateur possède les rôles -----
  const hasRole = (role: string): boolean =>
    Object.values(grantedRoles.resourceRoles).some((roles) => roles.includes(role));

  const hasRequiredRole = requiredRoles.some((r) => hasRole(r));

  if (authenticated && hasRequiredRole) {
    return true;
  }

  // ----- 3) Redirection vers /forbidden -----
  const router = inject(Router);
  return router.parseUrl('/forbidden');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
