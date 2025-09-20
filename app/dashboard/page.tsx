'use client';

import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
    const router = useRouter();
    useEffect(() => {
        const validAuth = localStorage.getItem('pos_token');
        if (!validAuth) {
            router.replace('/auth/cashier/login')
        }
    }, [router])
    return (
        <div className="flex flex-col h-screen">
            <div className="h-1/10">
                <NavBar />
            </div>
            <div className="h-9/10">
                <Sidebar />
            </div>
        </div>
    )
}