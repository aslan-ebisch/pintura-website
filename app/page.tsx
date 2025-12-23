'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-white">
      <Navigation />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Process />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

// Navigation
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-3xl font-bold tracking-tight"
          whileHover={{ scale: 1.05 }}
        >
          PINTURA<span className="text-[#9D2235]">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {['About', 'Services', 'Process', 'Gallery', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-gray-600 hover:text-black transition-colors"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <Link href="/book">
          <motion.span
            className="bg-[#9D2235] text-white px-6 py-2 text-sm font-medium hover:bg-[#7a1a2a] transition-colors inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Estimate
          </motion.span>
        </Link>
      </div>
    </motion.nav>
  );
}

// Hero Section
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gray-100"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/50" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-[#9D2235] text-sm font-medium tracking-[0.3em] uppercase">
            Student-Run. Professionally Trained. Northwest Arkansas.
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-6"
        >
          More than a paint job.
          <br />
          <span className="text-[#9D2235]">An investment in young futures.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Pintura is a student-run painting company where college students gain real leadership experience while delivering professional results. When you hire us, you&apos;re supporting hardworking students building their futures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/book">
            <motion.span
              className="bg-[#9D2235] text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-[#7a1a2a] transition-colors inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BOOK ESTIMATE
            </motion.span>
          </Link>
          <motion.a
            href="#gallery"
            className="border border-black/30 text-black px-8 py-4 text-sm font-medium tracking-wide hover:bg-black/5 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW OUR WORK
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-black/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-black/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Stats Section
function Stats() {
  const stats = [
    { value: '24', label: 'Homes Painted' },
    { value: '100%', label: 'Student-Powered' },
    { value: '24hr', label: 'Quote Response' },
  ];

  return (
    <section className="py-20 border-y border-black/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#9D2235] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
              <img
                src="/founder.jpg"
                alt="Aslan Ebisch - Founder of Pintura"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#9D2235]/10 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#9D2235]" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[#9D2235] text-sm font-medium tracking-[0.3em] uppercase">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Founded by a student.
              <br />
              <span className="text-gray-500">Powered by ambition.</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I started Pintura while in college because I wanted to build something real&mdash;not just another summer job, but a company that creates opportunities for students like me.
              </p>
              <p>
                Every person on my crew is a college student working hard to afford their education. My crew managers learn real leadership skills: managing teams, communicating with clients, solving problems on the fly. My painters develop professional techniques and job site standards they&apos;ll carry into any career.
              </p>
              <p>
                When you hire Pintura, you&apos;re not just getting a quality paint job. You&apos;re investing in local students building real careers and supporting young people who take pride in their work because their reputation&mdash;and their future&mdash;depends on it.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-black/10">
              <div className="text-2xl font-bold">Aslan Ebisch</div>
              <div className="text-[#9D2235] text-sm">Founder & College Student</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function Services() {
  const services = [
    {
      title: 'Exterior',
      description: 'Complete exterior transformations. Siding, trim, doors, shutters. Weather-resistant finishes that last.',
      icon: '01',
    },
    {
      title: 'Deck Finishing',
      description: 'Decks, fences, and pergolas. Proper prep, premium stains, and lasting protection for your outdoor wood.',
      icon: '02',
    },
    {
      title: 'Interior',
      description: 'Walls, ceilings, trim, and doors. Clean lines, smooth finishes, and attention to detail in every room.',
      icon: '03',
    },
    {
      title: 'Pressure Washing',
      description: 'Thorough exterior cleaning to prep your home for paint. Remove dirt, mold, and grime for a flawless finish.',
      icon: '04',
    },
  ];

  return (
    <section id="services" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#9D2235] text-sm font-medium tracking-[0.3em] uppercase">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Professionally trained.
            <br />
            <span className="text-gray-500">Hungry to prove it.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-white border border-black/10 hover:border-[#9D2235]/50 transition-all duration-300"
            >
              <div className="text-5xl font-bold text-[#9D2235]/20 group-hover:text-[#9D2235]/40 transition-colors mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-500">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Process Section
function Process() {
  const steps = [
    { step: '01', title: 'Contact', description: 'Reach out for a free estimate. We respond within 24 hours.' },
    { step: '02', title: 'Inspect', description: 'We visit your property, assess the scope, and provide a detailed quote.' },
    { step: '03', title: 'Prepare', description: 'Thorough prep work. Cleaning, sanding, priming. No shortcuts.' },
    { step: '04', title: 'Paint', description: 'Premium paints applied with precision. Multiple coats for lasting results.' },
    { step: '05', title: 'Perfect', description: 'Final walkthrough together. We don\'t leave until you\'re thrilled.' },
  ];

  return (
    <section id="process" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#9D2235] text-sm font-medium tracking-[0.3em] uppercase">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Young. Hungry. Thorough.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-black/10" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`flex items-center gap-8 mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className="text-[#9D2235] text-sm font-medium mb-2">{step.step}</div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
              <div className="hidden md:flex w-4 h-4 bg-[#9D2235] rounded-full relative z-10" />
              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Gallery Section
function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const projects = [
    '/IMG_1355.JPG',
    '/pic1.PNG',
    '/pic2.PNG',
    '/pic3.jpg',
    '/IMG_1175.JPG',
    '/IMG_1260.JPEG',
    '/pic4.PNG',
    '/IMG_1164.JPG',
    '/pic5.png',
  ];

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? projects.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === projects.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <>
      <section id="gallery" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#9D2235] text-sm font-medium tracking-[0.3em] uppercase">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Student work. Professional results.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedIndex(i)}
                className="group relative aspect-[4/3] bg-gray-200 overflow-hidden cursor-pointer"
              >
                <img
                  src={project}
                  alt="Completed painting project"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-[#9D2235] transition-colors z-10"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 text-white hover:text-[#9D2235] transition-colors z-10"
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 text-white hover:text-[#9D2235] transition-colors z-10"
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <motion.img
            key={selectedIndex}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={projects[selectedIndex]}
            alt="Enlarged project photo"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedIndex + 1} / {projects.length}
          </div>
        </motion.div>
      )}
    </>
  );
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      quote: "These guys showed up on time, worked hard, and my house looks amazing. You can tell they actually care about doing a good job.",
      name: "Sarah M.",
      location: "Springfield, MO",
    },
    {
      quote: "Great communication from start to finish. The crew was professional and respectful of our property. Highly recommend!",
      name: "Mike T.",
      location: "Springfield, MO",
    },
    {
      quote: "Loved supporting local students and the quality exceeded my expectations. Our neighbors have already asked for their number.",
      name: "Jennifer R.",
      location: "Springfield, MO",
    },
  ];

  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#9D2235] text-sm font-medium tracking-[0.3em] uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Homeowners who believed in us.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-gray-50 border border-black/10"
            >
              <div className="text-4xl text-[#9D2235] mb-4">&ldquo;</div>
              <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.quote}</p>
              <div>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section id="contact" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[#9D2235] text-sm font-medium tracking-[0.3em] uppercase">
              Get Started
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Support students.
              <br />
              Transform your home.
            </h2>
            <p className="text-gray-600 mb-8">
              Get a free, no-obligation estimate from our student crew. You&apos;ll get quality work and the satisfaction of supporting local college students working to build their futures.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#9D2235]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#9D2235]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Call us</div>
                  <div className="font-medium">(417) 849-0332</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#9D2235]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#9D2235]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email us</div>
                  <div className="font-medium">info@pinturaco.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#9D2235]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#9D2235]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Service area</div>
                  <div className="font-medium">Northwest Arkansas</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-black/20 px-4 py-3 text-black focus:border-[#9D2235] focus:outline-none transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-black/20 px-4 py-3 text-black focus:border-[#9D2235] focus:outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-black/20 px-4 py-3 text-black focus:border-[#9D2235] focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">Property Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-black/20 px-4 py-3 text-black focus:border-[#9D2235] focus:outline-none transition-colors"
                  placeholder="123 Main St, Fayetteville, AR"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">Tell us about your project</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-black/20 px-4 py-3 text-black focus:border-[#9D2235] focus:outline-none transition-colors resize-none"
                  placeholder="Describe what you're looking to have painted..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[#9D2235] text-white py-4 font-medium tracking-wide hover:bg-[#7a1a2a] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                REQUEST FREE ESTIMATE
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to receive communications from Pintura Co.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-3xl font-bold tracking-tight">
            PINTURA<span className="text-[#9D2235]">.</span>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Pintura Co. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-black transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
