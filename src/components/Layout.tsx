
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import NotificationManager from './NotificationManager';
import WhatsAppButton from './WhatsAppButton';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-accent/30 selection:text-primary">
      <Header />
      <main className="flex-grow bg-white pt-[140px] md:pt-[132px] lg:pt-[158px]">
        <Outlet />
      </main>
      <Footer />
      <NotificationManager />
      <WhatsAppButton />
      <ScrollRestoration />
    </div>
  );
}
