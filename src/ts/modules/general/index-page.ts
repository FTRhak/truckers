import { Component } from '@angular/core';

@Component({
  selector: 'app-trucker',
  template: `<h1>Index Page</h1>
<md-checkbox></md-checkbox>
<span mdTooltip="Tooltip!">I have a tooltip</span>

  `,
})
export class IndexPage  { name = 'Index'; }