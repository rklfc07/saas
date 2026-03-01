import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glow animation
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Content animation
      if (contentRef.current) {
        const heading = contentRef.current.querySelectorAll('.cta-heading');
        const desc = contentRef.current.querySelector('.cta-desc');
        const button = contentRef.current.querySelector('.cta-button');

        gsap.fromTo(
          heading,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.15,
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
          button,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-dark-surface relative overflow-hidden">
      {/* Radial Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-pulse-glow pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-gradient-radial from-blue-primary/40 via-blue-primary/10 to-transparent" />
      </div>

      {/* Floating Accents */}
      <div className="absolute top-10 left-10 text-blue-primary/30 animate-float-slow">
        <Sparkles size={32} />
      </div>
      <div className="absolute top-20 right-20 text-cyan-secondary/30 animate-float" style={{ animationDelay: '1s' }}>
        <Zap size={28} />
      </div>
      <div className="absolute bottom-16 left-20 text-blue-primary/20 animate-float-slow" style={{ animationDelay: '2s' }}>
        <Star size={24} />
      </div>
      <div className="absolute bottom-10 right-10 text-cyan-secondary/20 animate-float" style={{ animationDelay: '3s' }}>
        <Sparkles size={20} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="text-center">
          <h2 className="cta-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
            Ready to Transform
          </h2>
          <h2 className="cta-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Your Business?</span>
          </h2>

          <p className="cta-desc text-text-secondary text-lg max-w-xl mx-auto mb-10">
            Get started today and see how our solutions can help you grow. Join hundreds of businesses already using our platform.
          </p>

          <Link
            to="/contact"
            className="cta-button inline-flex items-center gap-2 px-10 py-4 rounded-xl gradient-bg text-white text-lg font-semibold transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:shadow-glow-lg hover:scale-105 animate-gradient-shift bg-[length:200%_200%] group"
          >
            Get Started
            <ArrowRight size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
