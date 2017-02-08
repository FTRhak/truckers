import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { AuthServer } from './../../server/auth';


@Component({
  selector: 'app-trucker',
  template: `
<header user></header>
<section class="user-edit-page">
    <user-edit-navigation></user-edit-navigation>
    <div>
      General
    </div>
</section>`,
  providers: [AuthServer]
})
export class UserEditGeneralPage extends Locale implements OnInit {
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
    const pageTitle = this.localization.translate('userEditGeneral.title');
    this.title.setTitle(pageTitle);
    if (!this.authServer.isLogin()) {
      this.router.navigate(['/login']);
    }
  }
}