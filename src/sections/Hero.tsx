import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const particles: Particle[] = [];
    const particleCount = 60;
    const connectionDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(41, 181, 201, 0.6)';
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(41, 181, 201, ${0.15 * (1 - distance / connectionDistance)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.headline-line');
        tl.fromTo(
          lines,
          { y: 50, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8, stagger: 0.15 },
          0.2
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { y: 30, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6 },
          0.7
        );
      }

      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('a');
        tl.fromTo(
          buttons,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
          0.9
        );
      }

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { rotateY: -25, rotateX: 8, opacity: 0, transformPerspective: 1200 },
          { rotateY: -8, rotateX: 3, opacity: 1, duration: 1 },
          0.6
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="particle-canvas opacity-60"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-transparent to-dark pointer-events-none z-[2]" />

      {/* Floating Accent Shapes */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-blue-primary/20 blur-2xl animate-float-slow z-[2]" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-cyan-secondary/20 blur-3xl animate-float z-[2]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div ref={headlineRef} className="space-y-2">
              <h1 className="headline-line text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Powerful Solutions
              </h1>
              <h1 className="headline-line text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">for Modern</span>
              </h1>
              <h1 className="headline-line text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Businesses
              </h1>
            </div>

            <p
              ref={descRef}
              className="mt-6 text-lg text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              We provide SaaS products that help you manage, distribute, and grow your business with ease. From lab management to CRM solutions, we've got you covered.
            </p>

            <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl gradient-bg text-white font-semibold transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:shadow-glow-lg animate-gradient-shift bg-[length:200%_200%] group"
              >
                Explore Products
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/20 text-white font-semibold transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:border-white/40 hover:bg-white/5"
              >
                <Play size={18} />
                Contact Us
              </Link>
            </div>
          </div>

          {/* Dashboard Preview Stack */}
          <div
            ref={imageRef}
            className="relative perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-primary/30 to-cyan-secondary/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Main Dashboard Image - Lab Dashboard */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 ease-expo-out group-hover:shadow-card-hover group-hover:border-blue-primary/30">
                <img
                  src="/images/lab/lab1.png"
                  alt="Lab Management Dashboard"
                  className="w-full h-auto transition-transform duration-500 ease-smooth group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Secondary Image - Patient List */}
              <div className="absolute -bottom-8 -left-8 w-2/3 rounded-xl overflow-hidden shadow-card border border-white/10 animate-float bg-dark-surface">
                <img
                  src="/images/lab/lab2.png"
                  alt="Patient List"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating Tertiary Image - Reports */}
              <div className="absolute -top-4 -right-4 w-1/2 rounded-xl overflow-hidden shadow-card border border-white/10 animate-float-slow bg-dark-surface">
                <img
                  src="/images/lab/lab4.png"
                  alt="Lab Reports"
                  className="w-full h-auto"
                />
              </div>

              {/* Stats Badge */}
              <div className="absolute bottom-20 -right-4 bg-dark-surface rounded-xl p-4 border border-white/10 shadow-card animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-lg">↑</span>
                  </div>
                  <div>
                    <p className="text-text-secondary text-xs">Efficiency</p>
                    <p className="text-white font-bold text-lg">+40%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
