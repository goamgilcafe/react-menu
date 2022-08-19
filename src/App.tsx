import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styles from "./App.module.css";
import Fab from "./components/fab/Fab";
import MenuContainer from "./components/t-container/MenuContainer";
import { EditMode } from "./interfaces/Edit";
import { menuDataMocksKR } from "./utils/mocks";
import {
    editModeRecoil,
    isEditingRecoil,
    menuDataRecoil,
} from "./utils/recoils";

let keyboardListenerAdded = false;

const App = () => {
    const [menuData, setMenuData] = useRecoilState(menuDataRecoil);
    const [registeredEvListener, setRegisteredEvListener] = useState<
        (event: KeyboardEvent) => void
    >((e) => {});
    const isEditing = useRecoilValue(isEditingRecoil);
    const setEditMode = useSetRecoilState(editModeRecoil);
    const toolRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMenuData(menuDataMocksKR);
        const menuDataKR = localStorage.getItem("kr");
        if (menuDataKR) {
            setMenuData(JSON.parse(menuDataKR));
        } else {
            localStorage.setItem("kr", JSON.stringify(menuDataMocksKR));
        }
    }, []);

    useEffect(() => {
        const tool = toolRef.current;
        if (tool) {
            tool.style.display = "none";
        }
    }, [toolRef]);

    useEffect(() => {
        const tool = toolRef.current;
        if (tool) {
            const listener = (event: KeyboardEvent) => {
                if (event.key === "p" || event.key === "ㅔ") {
                    const toolDisplay = tool.style.display;
                    console.log(toolDisplay);
                    if (toolDisplay === "none") {
                        tool.style.display = "";
                    } else {
                        tool.style.display = "none";
                    }
                } else if (event.key === "e" || event.key === "ㄷ") {
                    setEditMode(EditMode.EDIT);
                } else if (event.key === "v" || event.key === "ㅍ") {
                    setEditMode(EditMode.VIEW);
                } else if (event.key === "t" || event.key === "ㅅ") {
                    setEditMode(EditMode.TAG);
                }
            };
            if (!isEditing) {
                if (!keyboardListenerAdded) {
                    document.addEventListener("keyup", listener);
                    keyboardListenerAdded = true;
                    setRegisteredEvListener(() => listener);
                } else {
                    console.log("not added");
                }
            } else {
                document.removeEventListener("keyup", registeredEvListener);
                keyboardListenerAdded = false;
            }
        }
    }, [toolRef, isEditing]);

    return (
        <div className={styles.container}>
            <MenuContainer menuData={menuData} />
            <Fab toolRef={toolRef} />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default App;
