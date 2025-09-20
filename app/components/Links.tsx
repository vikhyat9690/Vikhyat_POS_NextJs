'use client';

import Image from "next/image";
import Link from "next/link";

export interface LinkItem {
    label: string;
    url: string;
    logo: string;
}

interface LinkProps {
    links: LinkItem[];
}

export default function Links({ links }: LinkProps) {

    return (
        <ul className="flex flex-col items-center justify-evenly h-3/4 w-3/4">
            {links.map((link) => (
                <Link key={link.url} href={link.url}>
                    <li className="group flex flex-col items-center justify-center 
                cursor-pointer p-4 hover:text-black hover:rounded-md hover:bg-white hover:transition
                hover:durationn-300 hover:ease-in-out delay-75">
                        <Image
                            src={link.logo}
                            height={30}
                            width={30}
                            alt="logo"
                            className="filter invert group-hover:invert-0 transition duration-300 ease-in-out delay-75"
                        />
                        <span className="text-sm">
                            {link.label}
                        </span>
                    </li>
                </Link>
            ))}
        </ul>
    );
}