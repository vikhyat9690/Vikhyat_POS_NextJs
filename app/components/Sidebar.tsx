"use client";
import Image from "next/image";
import Links, { LinkItem } from "./Links";
import { useEffect, useState } from "react";

const sidebarLinks: LinkItem[] = [
    {
        label: 'Home',
        url: '/dashboard',
        logo: '/assets/logo/home.png'
    },
    {
        label: 'Cashier',
        url: '/cashier',
        logo: '/assets/logo/cashier.png'
    },
    {
        label: 'Orders',
        url: '/orders',
        logo: '/assets/logo/orders.png'
    },
    {
        label: 'Reports',
        url: '/reports',
        logo: '/assets/logo/reports.png'
    },
    {
        label: 'Sync',
        url: '/sync',
        logo: '/assets/logo/sync.png'
    }
];

interface OutletImage {
    file: string;
    id: number;
    name: string;
    size: string;
    type: string;
    url: string;
}

export default function Sidebar() {
    const [outletImage, setOutletImage] = useState<OutletImage | null>(null);
    useEffect(() => {
        const outlet = localStorage.getItem("outlet_data");
        const parsetData = outlet && JSON.parse(outlet);
        const outletImage = JSON.parse(parsetData?.outlet_image);
        setOutletImage(outletImage);
    }, [])
    return (
        <div className="h-full w-1/14 flex flex-col items-center justify-between bg-black">
            <Links links={sidebarLinks} />
            {outletImage && outletImage?.url
            &&
            <Image
                src={outletImage?.url}
                height={60}
                width={60}
                alt="logo"
                className="rounded-full mb-4"
            />}
        </div>
    );
}