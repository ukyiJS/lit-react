import type { CSSResultGroup } from 'lit';
import { LitElement, unsafeCSS } from 'lit';
import vars from '@lit-react-example/shared/styles/vars.css?inline';
import base from '@lit-react-example/shared/styles/base.css?inline';

export abstract class BaseElement extends LitElement {
  private static _styles: CSSResultGroup;

  static get styles(): CSSResultGroup {
    return [unsafeCSS(base), unsafeCSS(vars.replace(/:root/g, ':host')), ...([this._styles ?? []].flat())];
  }

  static set styles(styles: CSSResultGroup) {
    this._styles = styles;
  }
}
