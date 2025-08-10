import * as Toast from "@radix-ui/react-toast";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";

import { IoIosNotifications } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

const heightToast = 100; // 100 px
const widthToast = 200; // 200 px
const gapsToast = 10; // 10 px

export default function ToastBoard() {
    const [toastArr, setToastArr] = useState([]);
    
    useEffect(() => {
        const handleToast = ({detail}) => {
            setToastArr(pre => [...pre, {title: detail.title, description: detail.description, type: detail.type}]);
        }
        document.addEventListener('toast', handleToast);
        return () => document.removeEventListener('toast', handleToast);

    }, []);

    return toastArr.map((toast, index) => {
            return <Toast.Provider key={index}>
            <Toast.Root
                onOpenChange={(value) => {
                    if(value === false) {
                        setToastArr(pre => pre.filter((el, elIndex) => elIndex !== index));
                    }
                }}
                className='border-1 border-white rounded-lg p-2 text-white shadow-xl/40 backdrop-blur-sm'
                asChild
            >
                <motion.div
                    className="w-[200px] h-[100px]" // hardcoded css styles make sure to change both vars and this on any change
                    initial={{
                        y: - ((toastArr.length - index - 1) * (heightToast + gapsToast)) + heightToast, 
                        // you nee to find the toast position from the last of the array, we want the ui to show last toast on bottom
                        // so to find the position of the toast from last, multiply with a one height of itself plus gaps between toasts
                        // Also adding one more height of toast in the initial animation state to make the animation start from down wihtout overlapping with another toasts
                        opacity: 0
                    }}
                    animate={{
                        y: - ((toastArr.length - index - 1) * (heightToast + gapsToast)),
                        opacity: 100
                    }}
                    transition={{
                        duration: 0.2
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
                    <Toast.Description>
                        {toast.description}
                    </Toast.Description>
                </motion.div>
            </Toast.Root>
            <Toast.Viewport 
                className="fixed bottom-2 right-2"
            >
            </Toast.Viewport>
        </Toast.Provider>
    })
}
