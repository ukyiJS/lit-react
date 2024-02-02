import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('hello-world')
export class MyElement extends LitElement {
  render() {
    return html`
      <h1>Lit Hello World!</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hello-world': MyElement
  }
}
