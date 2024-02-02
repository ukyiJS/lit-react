import { classNames } from '@lit-react-example/shared/utils/classNames';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from 'src/components/base-element';

type ButtonVariant = 'critical' | 'elevated' | 'outlined' | 'primary' | 'secondary';

type ButtonSize = 'large' | 'medium' | 'small' | 'tiny';

type ButtonIconPosition = 'left' | 'right';

const buttonStyle = css`
  button { display: inline-flex; min-width: 80px; padding: var(--space-3, 12px) var(--space-4, 16px); justify-content: center; align-items: center; gap: var(--space-2, 8px); flex: 1 0 0; border-radius: var(--rounded-medium); position: relative; transition: background-color,color 0.1s, 0.1s ease-out; }
  button.primary { background-color: var(--action-primary); color: var(--text-on); }
  button.primary:hover:not(:disabled) { background-color: var(--action-primary-hover); }
  button.primary:active:not(:disabled) { background-color: var(--action-primary-pressed); }
  button.primary-tonal { background-color: var(--action-primaryTonal); }
  button.secondary { background-color: transparent; color: var(--text-secondary); }
  button.secondary:hover:not(:disabled) { background-color: var(--action-secondary-hover); }
  button.secondary:active:not(:disabled) { background-color: var(--action-secondary-pressed); }
  button.secondary-tonal { background-color: var(--action-secondaryTonal); }
  button.critical { background-color: var(--action-critical); color: var(--text-on); }
  button.critical:hover:not(:disabled) { background-color: var(--action-critical-hover); }
  button.critical:active:not(:disabled) { background-color: var(--action-critical-pressed); }
  button.critical-tonal { background-color: var(--action-criticalTonal); }
  button.outlined { background-color: var(--action-secondary); color: var(--text-secondary); border: 1px solid var(--border); }
  button.outlined:hover:not(:disabled) { background-color: var(--action-secondary-hover); }
  button.outlined:active:not(:disabled) { background-color: var(--action-secondary-pressed); }
  button.elevated { background-color: var(--action-elevated); color: var(--text-on); }
  button.elevated:hover:not(:disabled) { background-color: var(--action-elevated-hover); color: var(--text-secondary-hover); }
  button.elevated:active:not(:disabled) { background-color: var(--action-elevated-pressed); }
  button.large { padding: var(--space-3) var(--space-4); border-radius: 12px; font-size: 16px; }
  button.medium { padding: var(--space-2) var(--space-3); border-radius: 8px; }
  button.small { padding: var(--space-1) var(--space-3); border-radius: 8px; }
  button.tiny { padding: var(--space-15) var(--space-2); border-radius: 8px; font-size: 12px; line-height: 16px; }
  button.full-width { width: 100%; }
  button.rounded { border-radius: var(--rounded-full); }
  button.icon-right img { order: 1; }
  button.icon-between { justify-content: space-between; }
  button.icon-between::after { content: ''; display: block; }
`;

@customElement('lit-react-button')
export class LitReactButton extends BaseElement {
  static styles = [buttonStyle];

  private _variant: ButtonVariant;

  @property({ type: Boolean }) tonal: boolean;
  @property() size: ButtonSize = 'medium';
  @property({ type: Boolean }) rounded: boolean;
  @property({ attribute: 'full-width' }) fullWidth: boolean;
  @property() icon: string;
  @property() iconPosition: ButtonIconPosition;
  @property({ type: Boolean }) disabled: boolean;
  get variant(): ButtonVariant | `${ButtonVariant}-tonal` {
    if (this.tonal) return `${this._variant}-tonal`;

    return this._variant;
  }

  @property()
  set variant(value: ButtonVariant) {
    this._variant = value;
  }

  get iconImage() {
    return this.icon && html`<img src="${this.icon}" alt="icon" />`;
  }

  protected render() {
    return html`
      <button class="${classNames('label-large', this.variant, this.size)}" ?disabled="${this.disabled}" part="button">
       ${this.iconImage}
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-react-button': LitReactButton;
  }
}
