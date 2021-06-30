import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'not-authenticated',
  template: `
    <h1>Please Log In</h1>
  `,
  styles: [
    `
      :host {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    `
  ]
})
export class NotAuthenticatedComponent {}
