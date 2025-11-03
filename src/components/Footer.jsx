export default function Footer() {
  return (
    <footer className="py-10 text-center text-sm text-neutral-600 dark:text-neutral-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} Your Name. Built with love, motion, and a sprinkle of 3D.
        </p>
      </div>
    </footer>
  );
}
