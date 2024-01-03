import ExampleComponent from "./components/ExampleComponent/ExampleComponent";
import { defineWebComponent } from "./utils/defineWebComponent";

defineWebComponent({
    webComponentName: 'example-component',
    reactComponent: ExampleComponent,
    useShadowDOM: false,
    defaultProps: {
        message: 'This is custom message from define function',
    },
});
