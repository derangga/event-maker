"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const sidebarLinks = [
    { name: "My Events", href: "/my-events" },
    { name: "Joined Events", href: "/joined-events" },
];

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform lg:translate-x-0 lg:static`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-semibold">Admin Panel</h2>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            <div className="flex-1">
                <div className="p-4 bg-white shadow-md lg:hidden">
                    <button onClick={() => setIsOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <main>{children}</main>
            </div>
        </div>
    );
}
