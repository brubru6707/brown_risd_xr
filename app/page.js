'use client';

// STEP 1: Import Suspense, dynamic, and your loading components
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import PageLoader from '@/components/PageLoader';
import Loading from './loading';

// We'll import some icons to make the page more visually appealing
import { Calendar, MapPin, Users, Mic, Gamepad2, BrainCircuit, Bot } from 'lucide-react';

// STEP 2: Dynamically import the Scene component with SSR disabled
const Scene = dynamic(() => import('@/components/Scene'), { 
  ssr: false 
});

// I've parsed your Instagram posts into a structured array of objects.
// This makes it much easier to display and manage the content.
const events = [
  {
    icon: Gamepad2,
    title: "Ready to Rave Beyond Reality?",
    date: "May 3rd",
    description: "Live DJ sets, glowing VR worlds, and full-body motion capture—all crafted by Brown + RISD students! A night to lose yourself between worlds.",
    location: "FAV Auditorium"
  },
  {
    icon: Bot,
    title: "Intro to Unity Workshop",
    date: "November 22nd",
    description: "Learn the basics of Unity, the game engine used to create immersive 2D and 3D games. The foundation for your own VR/AR experiences.",
    location: "Granoff Physical Media Lab"
  },
    {
    icon: BrainCircuit,
    title: "The Ethics of Virtual Reality",
    date: "November 26th",
    description: "A crucial discussion on the moral dilemmas of VR, covering privacy, human behavior, and the responsibilities of developers and users.",
    location: "Sayles Hall 204"
  },
  {
    icon: Mic,
    title: "Guest Speaker: Jared Zimmerman",
    date: "April 26th",
    description: "Jared Zimmerman, VP at Innovaccer, discusses his work leading the development of AI-driven tools to unify patient data and improve healthcare outcomes.",
    location: "Innovaccer HQ"
  },
];

const teams = [
    { name: "Co-Presidents", members: "Chloe, Elaine, Erin, and Suhang" },
    { name: "Events", members: "Ella, Jeffrey, Jewel, and Yuxi" },
    { name: "Marketing", members: "Amy, Nicole, and Xitong" },
    { name: "Design", members: "Anushka, Cynthia, Xitong, Jeff, Jiabao, and Yujin" },
];


export default function HomePage() {
  return (
    <PageLoader>
      <Suspense fallback={<Loading />}>
                <Scene />
        <div className="bg-gray-900 text-gray-200">
          {/* Hero Section */}
          <header className="relative h-screen flex flex-col items-center justify-center text-center">
            <div className="absolute top-0 left-0 w-full h-full z-10 bg-gray-900/50"></div>
            
            {/* STEP 3: Wrap the Scene component in Suspense */}
            <div className="relative z-20 p-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
                Brown RISD XR
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
                An interdisciplinary initiative driving exploration and education in extended reality (XR) technologies.
              </p>
            </div>
          </header>

          <main className="px-4 md:px-8">
            {/* About Section */}
            <section id="about" className="max-w-5xl mx-auto py-20 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Shaping the Future of VR/AR/XR</h2>
                 <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                     Welcome! We are a vibrant community of creators, thinkers, and innovators from Brown University and RISD. We host workshops, build games, run design sprints, and explore the limitless possibilities of extended reality. No experience is needed—just bring your curiosity!
                 </p>
            </section>

            {/* Events Showcase Section */}
            <section id="events" className="max-w-5xl mx-auto py-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">What We Do</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.map((event) => {
                        const Icon = event.icon;
                        return (
                            <div key={event.title} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:bg-gray-800 hover:border-blue-500 transition-all duration-300">
                                 <div className="flex items-center gap-4 mb-4">
                                    <Icon className="w-8 h-8 text-blue-400" />
                                    <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                                 </div>
                                 <p className="text-gray-400 mb-4">{event.description}</p>
                                 <div className="flex items-center text-sm text-gray-500 gap-6">
                                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{event.date}</span></div>
                                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{event.location}</span></div>
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Meet the Team Section */}
            <section id="teams" className="max-w-5xl mx-auto py-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Meet the Teams</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teams.map((team) => (
                        <div key={team.name} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-center">
                            <Users className="w-10 h-10 mx-auto mb-4 text-blue-400" />
                            <h3 className="text-xl font-bold text-white mb-2">{team.name}</h3>
                            <p className="text-gray-400">{team.members}</p>
                        </div>
                    ))}
                </div>
            </section>

          </main>

          {/* Footer */}
          <footer className="text-center py-10 border-t border-gray-800">
            <p className="text-gray-500">&copy; {new Date().getFullYear()} Brown RISD XR. All rights reserved.</p>
          </footer>
        </div>
      </Suspense>
    </PageLoader>
  );
}

