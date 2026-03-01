import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [clientCount, setClientCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      if (contentRef.current) {
        const label = contentRef.current.querySelector('.about-label');
        const heading = contentRef.current.querySelector('.about-heading');
        const desc = contentRef.current.querySelector('.about-desc');
        const cta = contentRef.current.querySelector('.about-cta');

        gsap.fromTo(
          label,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          heading,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          desc,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'smooth',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          cta,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { rotateY: 15, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Stats badge animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
              onEnter: () => {
                // Count up animation
                const target = 500;
                const duration = 2000;
                const startTime = performance.now();

                const animate = (currentTime: number) => {
                  const elapsed = currentTime - startTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const eased = 1 - Math.pow(1 - progress, 3);
                  setClientCount(Math.floor(eased * target));

                  if (progress < 1) {
                    requestAnimationFrame(animate);
                  }
                };

                requestAnimationFrame(animate);
              },
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <span className="about-label inline-block text-cyan-secondary text-sm font-semibold uppercase tracking-wider mb-4">
              About Us
            </span>

            <h2 className="about-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              We are a team of passionate developers and designers creating{' '}
              <span className="gradient-text">powerful SaaS solutions</span>.
            </h2>

            <p className="about-desc text-text-secondary text-lg leading-relaxed mb-8">
              Our mission is to simplify complex business processes through intuitive software. With years of experience in the industry, we understand the challenges you face and build tools that address real-world problems.
            </p>

            <Link
              to="/about"
              className="about-cta inline-flex items-center gap-2 text-white font-semibold group"
            >
              <span className="relative">
                Learn More
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-primary to-cyan-secondary transform origin-left transition-transform duration-250 ease-expo-out group-hover:scale-x-100 scale-x-0" />
              </span>
              <ArrowRight
                size={18}
                className="transition-transform duration-200 ease-expo-out group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div
              ref={imageRef}
              className="relative perspective-1000"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Frame */}
              <div className="absolute -inset-5 border-2 border-gradient-to-br from-blue-primary/50 to-cyan-secondary/50 rounded-2xl transform rotate-1 pointer-events-none" />

              {/* Image */}
              <div className="relative rounded-xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-auto transition-transform duration-500 ease-smooth group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Stats Badge */}
              <div
                ref={statsRef}
                className="absolute -bottom-8 -right-4 lg:right-8 bg-dark-surface rounded-2xl p-6 border border-white/10 shadow-card animate-float"
              >
                <div className="text-center">
                  <p className="text-4xl font-bold gradient-text">{clientCount}+</p>
                  <p className="text-text-secondary text-sm mt-1">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
