
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent/30 selection:text-primary">
      <Header />
      <main className="flex-grow bg-white">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
