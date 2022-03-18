import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, IconButton } from "@mui/material";
import React from "react";

interface DialogTitleProps {
    id?: string,
    children?: React.ReactNode,
    onClose: () => void,
}

export const StyledDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{
            backgroundColor: 'primary.main',
            textAlign: "left"
        }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'fixed',
                        mt: -4,
                        color: 'primary.main',
                        borderRadius: "50%",
                        backgroundColor: "common.white",
                        ":hover": {
                            backgroundColor: "common.white",
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};
