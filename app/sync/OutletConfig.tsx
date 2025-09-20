'use client';
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OUTLET_CONFIG } from "../Api/OutletConfig";

interface OutletConfigData {
    id: number;
    name: string;
    source: string;
    email: string;
    city: string;
    region: string;
    country: string;
    street_line_1: string;
    street_line_2: string;
    is_active: number;
    website_id: number;
    created_at: string;
}

export default function OutletConfig() {
    const [outlet, setOutlet] = useState<OutletConfigData|null>(null);
    const router = useRouter();
    const [getOutletConfig, { data, loading, error }] = useLazyQuery(OUTLET_CONFIG);

    const handleGetOutletConfig = async ()  => {
        const cashierData = localStorage.getItem("cashier_data");
        const cashier = cashierData 
        ? JSON.parse(cashierData)
        : null;
        const outletId = cashier && cashier?.outlet;
        try {
            const res = await getOutletConfig({variables: {outletId}})
            const outletData = res?.data?.getOutletConfigData;
            const parsedOutletData = JSON.stringify(outletData);
            localStorage.setItem("outlet_data", parsedOutletData);
            router.push('/dashboard')
        } catch (error: any) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        handleGetOutletConfig();
    }, [])

    return (
        <>
        Fetching outlet config...
        </>
    )
}