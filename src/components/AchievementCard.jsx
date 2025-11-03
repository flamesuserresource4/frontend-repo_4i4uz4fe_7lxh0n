import { ExternalLink, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AchievementCard({ title, description, date, link }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-5 hover:shadow-lg transition overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-teal-400/10" />
      <div className="relative flex items-start gap-4">
        <div className="shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br from-amber-400 to-rose-500 text-white flex items-center justify-center shadow">
          <Trophy size={20} />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-neutral-900 dark:text-white truncate">{title}</h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">{description}</p>
          <div className="mt-3 flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
            <span>{date}</span>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
              >
                View <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
