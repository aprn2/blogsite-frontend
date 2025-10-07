import { CgProfile } from "react-icons/cg";
import { GrLogout } from "react-icons/gr";
import * as Popover from "@radix-ui/react-popover";
import { useAppContext } from "./AppContext";
import { isSheduledLogout, userCxtStore } from "../utils/store";
import { logout } from "../utils/apiCalls";

export default function HeaderProfile() {
    const appState = useAppContext();

    return <Popover.Root modal>
        <Popover.Trigger
            className="flex items-center gap-2 justify-between"
        >
            <CgProfile
                className='text-3xl'
            />
        </Popover.Trigger>
        <Popover.Portal>
            <Popover.Content
                sideOffset='2'
                className='items-center border border-white/30 flex flex-col gap-2 text-white p-5 bg-white/8 shadow-md/20 w-full sticky top-0 z-20 backdrop-blur-sm'
            >
                <div className="flex flex-col gap-2 items-center border border-white/30 p-3 rounded-sm">
                    <span>Logged in as</span>
                    <span>{appState.userName}</span>
                </div>
                <button className="flex gap-2 items-center text-red-400 hover:text-red-500"
                    onClick={async() => {
                        try {
                            await logout();
                        }catch(e) {
                            isSheduledLogout.set(true);
                        }finally {
                            userCxtStore.set(undefined);
                            appState.setUserId(undefined);
                            appState.setIsAdmin(undefined);
                            appState.setUserName(undefined);
                            appState.token(undefined);
                        }
                    }}
                >
                    <GrLogout />
                    <span>Log out</span>
                </button>

            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
}
