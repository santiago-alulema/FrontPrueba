import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Markdown } from "components/markdown";
import { useState } from "react";

export type ModalProps = {
    data?: string
}

export const LabelTermsConditions = ({ data = '' }: ModalProps) => {

    const [open, setOpen] = useState(false);

    const changeOpen = () => {
        setOpen(!open);
    }

    const ModalCheck = () => {
        return (
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    padding: { md: 15 }
                }}
            >
                <DialogContent>
                    <Markdown>
                        {data}
                    </Markdown>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} autoFocus>
                        De acuerdo
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <div>
            <p>Acepto
                <span>
                    <Button variant='text'
                        size="small"
                        onClick={changeOpen} >Terminos y Condiciones</Button>
                </span>

            </p>
            {
                open ? <ModalCheck /> : <></>
            }
        </div>
    )
};

