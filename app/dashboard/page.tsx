'use client';

import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    useEffect(() => {
        const validAuth = localStorage.getItem('pos_token');
        if (!validAuth) {
            router.replace('/auth/cashier/login')
        }
    }, [router])
    return (
        <>
            <NavBar />
        </>
    )
}