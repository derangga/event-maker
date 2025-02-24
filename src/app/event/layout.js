import { auth } from "@/libs/auth";
import { LinkIcon, Button } from "@heroui/react";
import Link from "next/link";

export default async function Layout({ children }) {
  const session = await auth();

  return (
    <div className="relative">
      <header className="flex justify-between items-center px-2 lg:px-8 py-2">
        <h1 className="text-xl font-semibold tracking-wide">eventmakers.</h1>
        <div className="flex lg:gap-4">
          <Link
            href="/discover"
            className="text-gray-500 text-sm font-bold hover:text-black transition flex items-center"
          >
            Explore Events {<LinkIcon />}
          </Link>

          {session ? (
            <div>{session.user.name}</div>
          ) : (
            <Button
              as={Link}
              href="/login"
              color="primary"
              radius="lg"
              size="md"
              variant="light"
            >
              Sign In
            </Button>
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
