import ReactDOM from "react-dom/client";
import ExampleComponent, { ExampleComponentProps } from './components/ExampleComponent/ExampleComponent';
import { FunctionComponent } from 'react';

class ReactWebComponent extends HTMLElement {
    private ReactComponent: FunctionComponent<ExampleComponentProps>;

    private observer: MutationObserver;
    
    private reactRoot: ReactDOM.Root;
    
    public shadowRoot: ShadowRoot;
    
    constructor() {
        super();

        this.ReactComponent = ExampleComponent;
        this.observer = new MutationObserver(() => this.update);
        this.shadowRoot = this.attachShadow({ mode: 'open' });
        this.reactRoot = ReactDOM.createRoot(this.shadowRoot);

        this.init();
    }

    private init() {
        this.observer.observe(this, { attributes: true });
    }


    private mount() {
        // TODO: добавить пропсы и ивенты.
        this.reactRoot.render(<this.ReactComponent message='Test message' />);
    }

    private unmount() {
        this.reactRoot.unmount()
    }

    private update() {
        this.unmount();
        this.mount();
    }

    public connectedCallback() {
        const rwcStyles = document.querySelector('#rwc-builder-styles');

        if (rwcStyles) {
            this.shadowRoot.prepend(rwcStyles);
        }

        this.mount();
    }

    public disconnectedCallback() {
        this.unmount();
        this.observer.disconnect();
    }
}

customElements.define("example-component", ReactWebComponent);