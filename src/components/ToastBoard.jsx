import * as Toast from "@radix-ui/react-toast";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from "react";

import { IoIosNotifications } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

const heightToast = 90; // 100 px
const widthToast = 200; // 200 px

export default function ToastBoard() {
    const [toastArr, setToastArr] = useState([]);

    useEffect(() => {
        const handleToast = ({detail}) => {
            setToastArr(pre => [...pre, {title: detail.title, description: detail.description, type: detail.type, id: crypto.randomUUID()}]);
        }
        document.addEventListener('toast', handleToast);
        return () => document.removeEventListener('toast', handleToast);

    }, []);

    return <Toast.Provider 
        duration='5000'
    >
        <AnimatePresence>
            {toastArr.map(toast => (
                    <Toast.Root
                        key={toast.id}
                        defaultOpen
                        asChild
                        forceMount
                        onOpenChange={(o) => {
                            if(o === false) {
                                setToastArr(pre => 
                                    pre.filter(t => t.id !== toast.id)
                                );
                            }
                        }}
                    >
                        <motion.div
                            className="flex flex-col justify-between border-1 border-white rounded-lg text-white shadow-xl backdrop-blur-xl w-[200px] overflow-hidden pointer-events-auto"
                            initial={{
                                y: heightToast,
                                opacity: 0,
                                scale: 0.8,
                                height: 0,
                                padding: 0
                            }}
                            animate={{
                                y: 0,
                                opacity: 100,
                                scale: 1,
                                height: heightToast,
                                padding: 10
                            }}
                            exit={{
                                x: widthToast,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.3
                            }}
                        >
                            <Toast.Title
                                className="text-lg flex gap-2 items-center"
                            >
                                {
                                    toast.type === 'neutral' && <IoIosNotifications className="text-green-500"/>
                                }
                                {
                                    toast.type === 'warning' && <IoIosWarning className="text-yellow-500"/>
                                }
                                {
                                    toast.type === 'error' && <IoIosCloseCircle className="text-red-500"/>
                                }
                                {toast.title}
                            </Toast.Title>
                            <Toast.Description
                                className="text-sm text-gray-200"
                            >
                                {toast.description}
                            </Toast.Description>
                        </motion.div>
                    </Toast.Root>
            ))}
        </AnimatePresence>
        <Toast.Viewport 
            className="fixed inset-0 p-3 flex flex-col justify-end items-end gap-2 pointer-events-none" 
        />
    </Toast.Provider>
}
