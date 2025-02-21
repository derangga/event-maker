import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="text-center text-gray-500 py-4 border-t border-slate-700 w-5/12 self-center">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Link href="#" className="text-gray-400 font-bold hover:text-black transition">eventmakers.</Link>
                    <Link href="#" className="text-gray-400 font-bold hover:text-black transition">What&lsquo;s New</Link>
                    <Link href="#" className="text-gray-400 font-bold hover:text-black transition">Discover</Link>
                    <Link href="#" className="text-gray-400 font-bold hover:text-black transition">Help</Link>
                </div>
                <div>
                    Icon 1
                </div>
            </div>
            <p>Create Your First Event</p>
        </footer>
    )
}