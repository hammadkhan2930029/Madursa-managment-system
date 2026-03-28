import React from "react";
import { SideBar } from "../Components/SideBar/sidebar";

export const MainLayout = ({ children }) => {
    return (
        // Yahan se fixed/margin wali classes hata di hain kyunki SideBar mein wo pehle se hain
        <div className="font-urdu" dir="rtl">
            <SideBar>
                {children}
            </SideBar>
        </div>
    );
};