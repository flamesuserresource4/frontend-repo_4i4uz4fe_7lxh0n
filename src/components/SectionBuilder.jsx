import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Stars, FileText, Images, Award } from 'lucide-react';
import AchievementCard from './AchievementCard';

function SectionWrapper({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold tracking-tight"
        >
          {title}
        </motion.h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function InfoSection({ heading, content }) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-6">
      <h3 className="text-xl font-semibold">{heading}</h3>
      <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">{content}</p>
    </div>
  );
}

function AddAchievementCard({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', link: '' });

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-full min-h-[160px] w-full rounded-xl border border-dashed border-black/20 dark:border-white/20 hover:border-indigo-500/60 hover:bg-indigo-500/5 transition grid place-items-center"
      >
        <div className="text-center">
          <div className="mx-auto mb-2 h-10 w-10 grid place-items-center rounded-lg bg-indigo-600 text-white shadow">
            <Plus />
          </div>
          <p className="font-medium">Add Achievement</p>
          <p className="text-xs text-neutral-500">Title, description, date, link</p>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 grid place-items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="w-full max-w-lg rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">New Achievement</h3>
                <button onClick={() => setOpen(false)} className="rounded-md px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10">Close</button>
              </div>
              <div className="mt-4 space-y-3">
                {['title','description','date','link'].map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium capitalize mb-1">{key}</label>
                    {key === 'description' ? (
                      <textarea
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        rows={3}
                        className="w-full rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={key === 'description' ? 'What did you achieve?' : ''}
                      />
                    ) : (
                      <input
                        type="text"
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={key === 'date' ? 'Jan 2025' : key === 'link' ? 'https://example.com' : ''}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button onClick={() => setOpen(false)} className="rounded-md px-4 py-2 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">Cancel</button>
                <button
                  onClick={() => {
                    if (!form.title) return;
                    onAdd(form);
                    setForm({ title: '', description: '', date: '', link: '' });
                    setOpen(false);
                  }}
                  className="rounded-md px-4 py-2 text-white bg-gradient-to-r from-indigo-600 to-violet-600"
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function SectionBuilder() {
  const [sections, setSections] = useState([
    { id: 'about', type: 'info', heading: 'About Me', content: 'I love crafting delightful interfaces, building with React, and exploring 3D on the web. This portfolio is built to grow with you.' },
    { id: 'achievements', type: 'achievements', title: 'Achievements', items: [
      { title: 'Speaker at JS Conf', description: 'Gave a talk on performance patterns in modern React apps.', date: '2024', link: '' },
      { title: 'Product Launch', description: 'Led frontend for a SaaS launch reaching 10k users in 3 months.', date: '2023', link: '' },
    ] },
  ]);

  const addSection = (type) => {
    if (type === 'info') {
      const count = sections.filter(s => s.type === 'info').length + 1;
      setSections(prev => [
        ...prev,
        { id: `info-${count}`, type: 'info', heading: `New Section ${count}`, content: 'Write something awesome here.' }
      ]);
    } else if (type === 'achievements') {
      setSections(prev => [
        ...prev,
        { id: `achievements-${Date.now()}`, type: 'achievements', title: 'Achievements', items: [] }
      ]);
    }
  };

  const addAchievement = (sectionId, item) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, items: [item, ...s.items] } : s));
  };

  const templates = useMemo(() => ([
    { key: 'info', label: 'Info Section', icon: FileText, desc: 'Title + rich text content' },
    { key: 'achievements', label: 'Achievements Grid', icon: Award, desc: 'Cards for milestones' },
  ]), []);

  return (
    <section id="builder" className="scroll-mt-24 py-16 sm:py-24 bg-gradient-to-b from-white to-white dark:from-neutral-950 dark:to-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Build your sections</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">Add a new section from templates, and grow your portfolio over time.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {templates.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => addSection(key)} className="inline-flex items-center gap-2 rounded-md px-3 py-2 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:hidden mt-4 grid grid-cols-2 gap-2">
          {templates.map(({ key, label }) => (
            <button key={key} onClick={() => addSection(key)} className="rounded-md px-3 py-2 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm">
              + {label}
            </button>
          ))}
        </div>

        <div className="mt-10 space-y-16">
          {sections.map((section) => (
            <SectionWrapper key={section.id} id={section.id} title={section.type === 'info' ? section.heading : section.title}>
              {section.type === 'info' ? (
                <InfoSection heading={section.heading} content={section.content} />
              ) : (
                <div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AddAchievementCard onAdd={(item) => addAchievement(section.id, item)} />
                    {section.items.map((item, idx) => (
                      <AchievementCard key={idx} {...item} />
                    ))}
                  </div>
                </div>
              )}
            </SectionWrapper>
          ))}
        </div>

        <div id="contact" className="mt-20 rounded-xl border border-black/10 dark:border-white/10 p-6 backdrop-blur bg-white/70 dark:bg-neutral-900/70">
          <h3 className="text-xl font-semibold">Get in touch</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">Open to collaborations and opportunities. Drop a message and I’ll get back soon.</p>
          <form className="mt-4 grid sm:grid-cols-2 gap-3">
            <input className="rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your name" />
            <input className="rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email" type="email" />
            <textarea className="sm:col-span-2 rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" rows={4} placeholder="Message" />
            <div className="sm:col-span-2 flex justify-end">
              <button type="button" className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-white bg-gradient-to-r from-indigo-600 to-violet-600">
                <Plus size={16} /> Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
