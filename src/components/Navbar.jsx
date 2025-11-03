import { useState } from 'react';
import { Menu, X, Rocket, User, Star } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home', icon: Rocket },
    { label: 'About', href: '#about', icon: User },
    { label: 'Work', href: '#builder', icon: Star },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/40 bg-white/70 dark:bg-neutral-900/70 border-b border-black/10 dark:border-white/10">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-lg flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-tr from-indigo-500 via-sky-500 to-teal-400 text-white">
              <Rocket size={18} />
            </span>
            <span>My Portfolio</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="group inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition"
              >
                <Icon size={16} className="opacity-70 group-hover:opacity-100" />
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow hover:opacity-90 transition"
            >
              Contact
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600"
            >
              Contact
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
