import ReactDOM from "react-dom/client";
import ExampleComponent, { ExampleComponentProps } from './components/ExampleComponent/ExampleComponent';
import { FunctionComponent } from 'react';
import { getViteDevStyleElements } from "./utils/helpers";

class ReactWebComponent extends HTMLElement {
    private ReactComponent: FunctionComponent<ExampleComponentProps>;

    private observer: MutationObserver;
    
    private reactRoot: ReactDOM.Root;
    
    public shadowRoot: ShadowRoot;
    
    // TODO: Сделать данный класс универсальным.
    constructor() {
        super();

        this.ReactComponent = ExampleComponent;
        this.observer = new MutationObserver(() => this.update);
        this.shadowRoot = this.attachShadow({ mode: 'open' }); // TODO: Нужно добавить возможность отключать shadow DOM.
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
        // TODO распараллелить обработку стилей с shadow DOM и без.
        if (process.env.NODE_ENV === 'development') {
            const styleElements = getViteDevStyleElements();

            styleElements.reverse().forEach((el) => {
                this.shadowRoot.prepend(el);
            })
        }

        if (process.env.NODE_ENV === 'production') {
            const rwcStyles = document.querySelector('#rwc-builder-styles');

            if (rwcStyles) {
                this.shadowRoot.prepend(rwcStyles);
            }
        }
        
        this.mount();
    }

    public disconnectedCallback() {
        this.unmount();
        this.observer.disconnect();
    }
}

customElements.define("example-component", ReactWebComponent);