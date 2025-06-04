import Link from "next/link";
import PageWrapper from "@/app/_components/PageWrapper";

export default function Navbar() {
  return (
    <PageWrapper className="py-4">
      <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-accent-3 dark:text-green-400 hover:text-accent-2 dark:hover:text-accent-2 transition"
        >
          claudewidmer.ch
        </Link>

        {/* Navigation */}
        <div className="flex gap-6 text-base font-medium text-gray-700 dark:text-gray-200">
          <Link
            href="/"
            className="hover:text-accent-2 dark:hover:text-green-400 transition"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-accent-2 dark:hover:text-green-400 transition"
          >
            About me
          </Link>
        </div>
      </nav>
    </PageWrapper>
  );
}
