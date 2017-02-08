import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { AuthServer } from './../../server/auth';

@Component({
  selector: 'app-trucker',
  template: `
<header user></header>
<section class="profile-page ">
    <user-data-profile [user]="user"></user-data-profile>
    <user-actions></user-actions>
    <user-current-delivery-order class="inset md-block"></user-current-delivery-order>
    <user-skills class="inset md-block"></user-skills>
</section>`,
  providers: [AuthServer]
})
export class UserProfilePage extends Locale implements OnInit {
  name = 'Profile';
  user: any;
  constructor(
    private authServer: AuthServer,
    public router: Router,
    private title: Title,
    public locale: LocaleService,
    public localization: LocalizationService) {
    super(locale, localization);
    this.user = this.authServer.getUser();
  }
  ngOnInit() {
    const pageTitle = this.localization.translate('profile.title');
    this.title.setTitle(pageTitle);
    if (this.authServer.isLogin()) {
      this.router.navigate(['/user']);
    }
  }
}