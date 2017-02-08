import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Locale, LocaleService, LocalizationService } from 'angular2localization';

import { AuthServer } from './../../server/auth';

@Component({
  selector: 'app-trucker',
  template: `
<header user></header>
<section class="messages-page ">
    Messages. Will be soon!
</section>`,
  providers: [AuthServer]
})
export class MessagesListPage extends Locale implements OnInit {
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
    const pageTitle = this.localization.translate('messages.title');
    this.title.setTitle(pageTitle);
    if (!this.authServer.isLogin()) {
      this.router.navigate(['/login']);
    }
  }
}