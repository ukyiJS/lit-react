import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from 'src/pages';
import '@lit-react-example/shared/styles/base.css';
import '@lit-react-example/shared/styles/vars.css';

window.customElements.define = new Proxy(window.customElements.define, {
  apply(target, thisArg, args) {
    if (window.customElements.get(args[0])) return;

    return Reflect.apply(target, thisArg, args);
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
);
