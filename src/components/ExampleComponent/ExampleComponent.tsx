import { FunctionComponent } from "react";
import styles from "./styles.module.scss"

export interface ExampleComponentProps {
    message: string;
}
 
const ExampleComponent: FunctionComponent<ExampleComponentProps> = (props: ExampleComponentProps) => {
    const { message } = props;

    return ( 
        <>
            <h1>Hello world!</h1>
            <p className={styles.purple_text}>
                {message}
            </p>
        </>
     );
}
 
export default ExampleComponent;