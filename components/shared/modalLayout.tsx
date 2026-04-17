"use client";

import { ReactNode } from "react";
import { Modal } from "@heroui/react";
import { IoIosCloseCircle } from "react-icons/io";

interface ModalLayoutProps {
    children: ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
    title?: string;
    width?: string;
    height?: string;
    rounded?: string;
    hideCloseIcon?: boolean;
    placement?: "auto" | "top" | "center" | "bottom"
}

export default function ModalLayout({
    children,
    open,
    setOpen,
    title,
    width = "450px",
    height = "auto",
    rounded = "16px",
    hideCloseIcon = false,
    placement
}: ModalLayoutProps) {
    return (
        <Modal isOpen={open} onOpenChange={setOpen}>
            <Modal.Backdrop>
                <Modal.Container placement={placement} className=" p-0! m-0! w-full! " >
                    <Modal.Dialog
                        className="bg-white relative"
                        // style={{
                        //     width,
                        //     height,
                        //     borderRadius: rounded,
                        // }}
                    >
                        {!hideCloseIcon && (
                            <Modal.CloseTrigger /> 
                        )}

                        {title && (
                            <Modal.Header>
                                <Modal.Heading>
                                    <div className="text-center text-primary font-extrabold text-lg p-4">
                                        {title}
                                    </div>
                                </Modal.Heading>
                            </Modal.Header>
                        )}

                        <Modal.Body >
                            <div className=" w-full overflow-x-hidden " >
                            {children}
                            </div>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
