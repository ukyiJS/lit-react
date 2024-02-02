import { css, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classNames } from '@lit-react-example/shared/utils/classNames';
import { BaseElement } from 'src/components/base-element';
import closeIcon from 'src/assets/icon/close.svg';
import warningIcon from 'src/assets/icon/warning.svg';

type ToastType = 'fail' | 'success';

type ToastPosition = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';

type ToastState = {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
  position: ToastPosition;
  out: boolean;
};

type ToastOptions = Pick<ToastState, 'duration' | 'position' | 'type'>;

const toastStyle = css`
  [role="alert"] { margin: unset; padding: 16px 20px; position: fixed; z-index: 9999; visibility: visible; border-radius: 50px; transition: visibility 0.5s, opacity 0.5s, top 0.5s, bottom 0.5s; backdrop-filter: blur(3px); box-shadow: 0 14px 32px 0 rgba(75, 81, 91, 0.12), 0 10px 14px 0 rgba(75, 81, 91, 0.06), 0px 0px 0px 1px rgba(75, 81, 91, 0.03), 0 0 1px 0 rgba(75, 81, 91, 0.20); }
  .out { visibility: hidden; }
  .success { background-color: var(--success); }
  .info { background-color: var(--info); }
  .fail { background-color: var(--fail); }
  [class*="top"] { margin-top: 20px; top: 20px; animation: topFadeIn 0.5s forwards; }
  [class*="top"].out { animation: topFadeOut 0.5s forwards; }
  [class*="bottom"] { margin-bottom: 20px; bottom: 20px; animation: bottomFadeIn 0.5s forwards; }
  [class*="bottom"].out { animation: bottomFadeOut 0.5s forwards; }
  [class*="left"] { left: 20px; }
  [class*="right"] { right: 20px; }
  [class*="center"] { left: 50%; transform: translateX(-50%); }
  .message { display: flex; align-items: center; color: var(--text-on); font-family: Pretendard, sans-serif; font-size: 16px; font-style: normal; font-weight: 400; }
  .fail .message::before { content: ''; display: block; width: 16px; height: 16px; ${unsafeCSS(`background-image: url("${warningIcon}");`)} background-size: cover; margin-right: 8px; }
  button { border: none; background-color: transparent; cursor: pointer; display: inline-flex; padding: unset; }
  button.close-button::before { content: ''; display: block; width: 16px; height: 16px; margin-left: 16px; ${unsafeCSS(`background-image: url("${closeIcon}");`)} background-size: cover; }
  @keyframes topFadeOut {
    from { top: 20px; opacity: 1; }
    to { top: 20px; opacity: 0; }
  }
  @keyframes bottomFadeOut {
    from { bottom: 20px; opacity: 1; }
    to { bottom: 20px; opacity: 0; }
  }
  @keyframes topFadeIn {
    from { top: 0; opacity: 0; }
    to { top: 20px; opacity: 1; }
  }
  @keyframes bottomFadeIn { 
    from { bottom: 0; opacity: 0; }
    to { bottom: 20px; opacity: 1; }
  }
`;

@customElement('lit-react-toast')
export class LitReactToast extends BaseElement {
  static styles = [toastStyle];

  @property() type: ToastType = 'success';
  @property() message: string;
  @property({ type: Number }) duration: number = 3000;
  @property() position: ToastPosition = 'bottom-center';
  @property({ type: Boolean }) stack: boolean = false;
  @state() private sequence = 0;
  @state() private intervalId = -1;
  @state() private toastList: ToastState[] = [];

  protected render() {
    return html`
      <section class="toast-container" part="toast">
        ${this.toastList.map(toast => html`
          <div role="alert" data-id="${toast.id}" class="${classNames(toast.position, toast.type, toast.out && 'out')}">
            <span class="message">
              ${toast.message}
              <button class="close-button" @click="${() => this.removeToast(toast.id)}"></button>
            </span>
          </div>
        `)}
      </section>
    `;
  }

  show(message: string, { type = this.type, position = this.position, duration = this.duration || 1500 }: ToastOptions = {} as ToastOptions) {
    this.addToast(message, { type, duration, position });
  }

  private tick() {
    this.toastList.forEach(toast => {
      if (!toast.out) toast.duration -= 100;
      if (toast.duration === 0) this.removeToast(toast.id);
    });
    if (this.toastList?.length) return;

    clearInterval(this.intervalId);
    this.intervalId = -1;
  }

  private addToast(message: string, { type, duration, position }: ToastOptions) {
    const toast = { id: this.sequence++, message, type, duration, position, out: false };
    if (this.stack) this.toastList = [...this.toastList, toast].filter(t => !t.out);
    else {
      this.toastList = [];
      setTimeout(() => this.toastList = [toast], 0);
    }

    if (this.intervalId > -1) return;
    this.intervalId = setInterval(() => this.tick(), 100) as unknown as number;
  }

  private removeToast(id: number) {
    this.toastList = this.toastList.map(t => t.id === id ? { ...t, out: true } : t);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-react-toast': LitReactToast;
  }
}
