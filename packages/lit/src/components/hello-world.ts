import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseElement } from 'src/components/base-element';

@customElement('hello-world')
export class HelloWorld extends BaseElement {
  render() {
    return html`
      <h1>Lit Hello World!</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hello-world': HelloWorld;
  }
}
