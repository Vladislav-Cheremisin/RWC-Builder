import ReactDOM from "react-dom/client";
import { FunctionComponent } from "react";
import { getViteDevStyleElements } from "./helpers";

interface WebComponentConfig<T> {
    webComponentName: string,
    reactComponent: FunctionComponent<T>,
    defaultProps: T,
    useShadowDOM: boolean,
    shadowRootMode?: ShadowRootMode,
}

export const defineWebComponent = <T extends object>(config: WebComponentConfig<T>) => {
    const {
        webComponentName,
        reactComponent,
        defaultProps,
        useShadowDOM,
        shadowRootMode,
    } = config;

    class ReactWebComponent extends HTMLElement {
        private ReactComponent: FunctionComponent<T>;
    
        private observer: MutationObserver;
        
        private reactRoot: ReactDOM.Root;
        
        public shadowRoot: ShadowRoot | null;
        
        constructor() {
            super();
    
            this.ReactComponent = reactComponent;
            this.observer = new MutationObserver(() => this.update);

            this.shadowRoot = useShadowDOM 
                ? this.attachShadow({ mode: shadowRootMode || 'open' })
                : null;
            
            this.reactRoot = this.shadowRoot
                ? ReactDOM.createRoot(this.shadowRoot)
                : ReactDOM.createRoot(this);
    
            this.init();
        }
    
        private init() {
            this.observer.observe(this, { attributes: true });
        }
    
    
        private mount() {
            // TODO: добавить пропсы и ивенты.
            this.reactRoot.render(<this.ReactComponent {...defaultProps} />);
        }
    
        private unmount() {
            this.reactRoot.unmount()
        }
    
        private update() {
            this.unmount();
            this.mount();
        }
    
        public connectedCallback() {
            if (this.shadowRoot && process.env.NODE_ENV === 'development') {
                const styleElements = getViteDevStyleElements();
    
                styleElements.reverse().forEach((el) => {
                    this.shadowRoot && this.shadowRoot.prepend(el);
                })
            }
    
            if (this.shadowRoot && process.env.NODE_ENV === 'production') {
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
    
    customElements.define(webComponentName, ReactWebComponent);
}