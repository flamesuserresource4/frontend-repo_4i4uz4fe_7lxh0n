import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionBuilder from './components/SectionBuilder';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white selection:bg-indigo-600 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <SectionBuilder />
      </main>
      <Footer />
    </div>
  );
}

export default App;
