'use client';

import Link from 'next/link';
import supportHours from '@/content/support-hours.json';
import reminders from '@/content/reminders.json';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MilestoneCountdown } from '@/components/shared/MilestoneCountdown';
import {
  Bell,
  Calendar,
  Rocket,
  Info,
  Laptop,
  Library,
  GraduationCap,
  Folder,
  ExternalLink,
  Slack,
  Mail,
  ChevronRight,
  Search
} from 'lucide-react';

export default function Home() {
  const nextMilestone = {
    title: "Welcome Ceremony - Day 1",
    date: "2026-03-09T09:00:00"
  };

  const quickLinks = [
    { title: 'Information Package', icon: Info, link: '/about', color: 'bg-blue-500' },
    { title: 'Tech Stack', icon: Laptop, link: '/tech-stack', color: 'bg-purple-500' },
    { title: 'Support Materials', icon: Library, link: '/support-materials', color: 'bg-amber-500' },
    { title: 'Bootcamp Material', icon: Rocket, link: '/bootcamp', color: 'bg-rose-500' },
    { title: 'Core Program', icon: GraduationCap, link: '/core-program', color: 'bg-emerald-500' },
    { title: 'Team Folders', icon: Folder, link: '/team-folders', color: 'bg-sky-500' },
  ];

  return (
    <div className="min-h-screen bg-polar">
      <Header />

      <main>
        <Hero />

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reminders Card */}
                <Card variant="accent" className="border-l-sky-blue relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-sky-blue/10 group-hover:scale-125 transition-transform duration-500">
                    <Bell size={64} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-onyx flex items-center gap-3 mb-6">
                      <span className="p-2 bg-sky-blue/10 rounded-lg text-sky-blue"><Bell size={20} /></span>
                      Reminders
                    </h3>
                    <ul className="space-y-4">
                      <li className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <strong className="text-error text-xs font-bold uppercase tracking-wider block mb-1">{reminders.highPriority.label}</strong>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {reminders.highPriority.text}{' '}
                          <a
                            href={reminders.highPriority.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-bold inline-flex items-center gap-1"
                          >
                            {reminders.highPriority.linkText} <ExternalLink size={12} />
                          </a>
                        </p>
                      </li>
                      <li className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <strong className="text-warning text-xs font-bold uppercase tracking-wider block mb-1">{reminders.upcoming.label}</strong>
                        <p className="text-gray-600 text-sm">{reminders.upcoming.text}</p>
                      </li>
                    </ul>
                  </div>
                </Card>

                {/* Support Hours Card */}
                <Card variant="accent" className="border-l-primary relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-primary/10 group-hover:scale-125 transition-transform duration-500">
                    <Calendar size={64} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-onyx flex items-center gap-3 mb-6">
                      <span className="p-2 bg-primary/10 rounded-lg text-primary"><Calendar size={20} /></span>
                      Drop-in Support
                    </h3>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <strong className="text-onyx min-w-[60px]">Hosts:</strong> {supportHours.hosts}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <strong className="text-onyx min-w-[60px]">When:</strong> {supportHours.time}
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => window.open(supportHours.zoomLink, '_blank')}
                      className="group/btn"
                    >
                      Join Zoom Meeting <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Main Program Resources Navigation */}
              <div className="pt-8">
                <h2 className="text-3xl font-black text-onyx mb-10 tracking-tight flex items-center gap-4">
                  Program Navigator
                  <span className="h-px flex-1 bg-gray-100"></span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {quickLinks.map((item) => (
                    <Link key={item.title} href={item.link}>
                      <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group h-64 flex flex-col justify-between border-gray-100 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${item.color}/5 rounded-bl-full -mr-4 -mt-4 transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`} />

                        <div>
                          <div className={`w-14 h-14 ${item.color}/10 rounded-2xl flex items-center justify-center text-onyx mb-6 group-hover:scale-110 transition-transform duration-500`}>
                            <item.icon size={28} className="text-onyx opacity-70" />
                          </div>
                          <h4 className="font-extrabold text-xl text-onyx tracking-tight leading-tight group-hover:text-primary transition-colors">{item.title}</h4>
                        </div>
                        <div className="flex items-center text-xs font-bold text-gray-400 group-hover:text-primary transition-colors gap-2 uppercase tracking-widest mt-4">
                          Explore <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar with Milestone and Slack */}
            <aside className="space-y-8">
              <MilestoneCountdown targetDate={nextMilestone.date} title={nextMilestone.title} />

              <Card className="bg-sky-900/5 border-sky-900/10 p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <Slack size={32} className="text-[#4A154B]" />
                </div>
                <h3 className="font-bold text-onyx mb-2 text-lg">Join the Slack Community</h3>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">Connect with your cohort, share wins, and get real-time support from mentors.</p>
                <Button
                  variant="outline"
                  fullWidth
                  className="font-bold border-gray-200 hover:border-primary hover:text-primary"
                  onClick={() => window.open('https://join.slack.com/t/l2mprairies/shared_invite/zt-3nsczt0kg-vH_jePpnjxhoUfiV7Ex9Pg', '_blank')}
                >
                  Go to Slack
                </Button>
              </Card>

              <Card className="bg-white border-gray-100 p-8">
                <h3 className="font-bold text-onyx mb-6 flex items-center gap-2">
                  <Mail size={18} className="text-primary" />
                  Quick Contact
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Demetre Balaktsis</p>
                    <a href="mailto:demetre.balaktsis@umanitoba.ca" className="text-sm font-medium text-onyx hover:text-primary transition-colors">demetre.balaktsis@umanitoba.ca</a>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">JP Giordani</p>
                    <a href="mailto:jp.giordani@umanitoba.ca" className="text-sm font-medium text-onyx hover:text-primary transition-colors">jp.giordani@umanitoba.ca</a>
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </main>

      <footer className="bg-onyx text-white py-16 mt-24">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-1 bg-primary/20 mx-auto mb-8 rounded-full" />
          <p className="opacity-40 text-sm tracking-wide">© 2026 LAB2MARKET PRAIRIES • ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  );
}
