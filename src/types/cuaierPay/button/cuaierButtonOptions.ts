import { Xprops } from "./xprops";

export interface cuaierButtonOptions {
    cuaierPayButton: (props: Xprops) => renderOptionWithContainer;
    cuaierPayPopup: (props: Xprops) => renderOption;
}

export interface renderOption {
    render: () => void;
}

export interface renderOptionWithContainer {
    render: (contenedor: string) => void;
}