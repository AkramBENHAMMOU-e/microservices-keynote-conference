import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink, RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: true
})
export class Navbar {

  constructor(private keycloak: Keycloak) {
  }

  async handleLogin() {
    await this.keycloak.login({
      redirectUri: window.location.origin
    });
  }
  async handleLogout() {
    await this.keycloak.logout({ redirectUri: window.location.origin });
  }
}
