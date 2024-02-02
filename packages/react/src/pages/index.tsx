import { createComponent } from '@lit/react';
import React, { useRef } from 'react';
import HelloWorld from 'src/components/HelloWorld';
import { LitReactButton, LitReactToast } from '@lit-react-example/lit';

const LitReactToastComponent = createComponent({
  tagName: 'lit-react-toast',
  elementClass: LitReactToast,
  react: React,
});

const LitReactButtonComponent = createComponent({
  tagName: 'lit-react-button',
  elementClass: LitReactButton,
  react: React,
});

export default function Index() {
  const toast = useRef<LitReactToast>(null);
  const handleButtonClick = () => {
    toast.current?.show('Hello world!');
  };

  return (
    <main>
      <HelloWorld />
      <LitReactToastComponent ref={toast} />
      <LitReactButtonComponent variant="primary" onClick={handleButtonClick}>toast</LitReactButtonComponent>
    </main>
  );
}
