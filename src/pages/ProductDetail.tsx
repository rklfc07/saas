import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, FlaskConical, Pill, Users, Star, Zap, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  title: string;
  tagline: string;
  fullDescription: string;
  icon: React.ElementType;
  image: string;
  gallery: string[];
  features: { title: string; description: string }[];
  benefits: string[];
  stats: { value: string; label: string }[];
  testimonials: { name: string; role: string; content: string }[];
}

const productsData: Record<string, Product> = {
  'lab-management': {
    id: 'lab-management',
    title: 'Lab Management System',
    tagline: 'Streamline Your Laboratory Operations',
    fullDescription: 'Our comprehensive Lab Management System is designed to transform how modern laboratories operate. From sample tracking to compliance reporting, we provide all the tools you need to run an efficient, accurate, and compliant laboratory.',
    icon: FlaskConical,
    image: '/images/lab/lab1.png',
    gallery: [
      '/images/lab/lab1.png',
      '/images/lab/lab2.png',
      '/images/lab/lab3.png',
      '/images/lab/lab4.png',
      '/images/lab/lab5.png',
    ],
    features: [
      { title: 'Sample Tracking', description: 'Track every sample from collection to result with barcode scanning and real-time status updates.' },
      { title: 'Workflow Automation', description: 'Automate repetitive tasks and reduce manual errors with intelligent workflow management.' },
      { title: 'Compliance Reports', description: 'Generate audit-ready reports and maintain regulatory compliance with ease.' },
      { title: 'Quality Control', description: 'Built-in QC modules ensure accuracy and reliability of your test results.' },
      { title: 'Patient Management', description: 'Complete patient registration, history tracking, and report generation.' },
      { title: 'Billing & Invoicing', description: 'Integrated billing system with automated invoice generation.' },
    ],
    benefits: [
      'Reduce manual errors by 90%',
      'Increase lab productivity by 40%',
      'Ensure 100% regulatory compliance',
      'Real-time sample status tracking',
      'Automated report generation',
      'Seamless billing integration',
    ],
    stats: [
      { value: '500+', label: 'Labs Using Our System' },
      { value: '99.9%', label: 'Uptime Guaranteed' },
      { value: '40%', label: 'Productivity Increase' },
      { value: '24/7', label: 'Support Available' },
    ],
    testimonials: [
      { name: 'Dr. Sarah Chen', role: 'Lab Director, Metro Diagnostics', content: 'This system has transformed our laboratory operations. We have seen a 50% reduction in turnaround time.' },
      { name: 'Rajesh Kumar', role: 'Pathology Manager', content: 'The compliance features are excellent. Audit preparation is now a breeze.' },
    ],
  },
  'pharma-distribution': {
    id: 'pharma-distribution',
    title: 'Pharma Distribution',
    tagline: 'Efficient Medicine Distribution Management',
    fullDescription: 'Specialized software for pharmaceutical distributors to manage inventory, track orders, optimize deliveries, and maintain regulatory compliance across the entire supply chain.',
    icon: Pill,
    image: '/images/pharma/pharma2.png',
    gallery: [
      '/images/pharma/pharma2.png',
      '/images/pharma/pharma3.png',
      '/images/pharma/pharma4.png',
    ],
    features: [
      { title: 'Inventory Management', description: 'Real-time stock tracking with automated alerts for low inventory and expiry dates.' },
      { title: 'GST Billing', description: 'Complete GST-compliant billing system with automated tax calculations.' },
      { title: 'Stock Alerts', description: 'Get notified when medicines are below reorder level or nearing expiry.' },
      { title: 'Batch Tracking', description: 'Complete traceability from manufacturer to end customer.' },
      { title: 'Purchase Management', description: 'Streamlined purchase order creation and vendor management.' },
      { title: 'Ledger & Accounts', description: 'Integrated accounting with party ledgers and outstanding tracking.' },
    ],
    benefits: [
      'Reduce stockouts by 75%',
      'GST compliant invoicing',
      'Prevent expired medicine sales',
      'Complete batch traceability',
      'Automated stock alerts',
      'Real-time inventory visibility',
    ],
    stats: [
      { value: '1000+', label: 'Distributors Trust Us' },
      { value: '75%', label: 'Stockout Reduction' },
      { value: '30%', label: 'Route Optimization' },
      { value: '100%', label: 'Traceability' },
    ],
    testimonials: [
      { name: 'Amit Patel', role: 'CEO, PharmaDistro Inc.', content: 'Our delivery efficiency improved by 40% within the first month of implementation.' },
      { name: 'Priya Sharma', role: 'Operations Head', content: 'The expiry management feature alone has saved us thousands in prevented losses.' },
    ],
  },
  'crm-software': {
    id: 'crm-software',
    title: 'CRM Software',
    tagline: 'Build Stronger Customer Relationships',
    fullDescription: 'An intuitive CRM platform that helps businesses manage leads, track customer interactions, automate sales processes, and close more deals with data-driven insights.',
    icon: Users,
    image: '/images/crm/crm2.png',
    gallery: [
      '/images/crm/crm2.png',
      '/images/crm/crm3.png',
      '/images/crm/crm4.png',
      '/images/crm/crm5.png',
    ],
    features: [
      { title: 'Lead Management', description: 'Capture, score, and nurture leads through the entire sales funnel.' },
      { title: 'Admission Tracking', description: 'Track and manage student admissions with complete pipeline visibility.' },
      { title: 'Enquiry Management', description: 'Handle all customer enquiries with automated follow-ups.' },
      { title: 'Analytics Dashboard', description: 'Deep insights into performance with monthly trends and source breakdown.' },
      { title: 'Target Overview', description: 'Monitor progress towards monthly goals with visual indicators.' },
      { title: 'Team Management', description: 'Manage counselors and track their performance metrics.' },
    ],
    benefits: [
      'Increase conversions by 35%',
      'Improve customer retention by 50%',
      'Automate 80% of repetitive tasks',
      'Data-driven decision making',
      '360° customer view',
      'Faster deal closure',
    ],
    stats: [
      { value: '10K+', label: 'Active Users' },
      { value: '35%', label: 'Sales Increase' },
      { value: '50%', label: 'Better Retention' },
      { value: '2x', label: 'Faster Closures' },
    ],
    testimonials: [
      { name: 'Michael Roberts', role: 'Sales Director, TechFlow', content: 'Our sales team productivity doubled within three months of using this CRM.' },
      { name: 'Lisa Wong', role: 'CEO, GrowthLabs', content: 'The analytics features give us insights we never had before. Game changer!' },
    ],
  },
};

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-gray-100 to-white">
        <img
          src={images[currentIndex]}
          alt={`Screenshot ${currentIndex + 1}`}
          className="w-full h-auto object-cover object-top transition-all duration-500"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-surface/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-blue-primary transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-surface/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-blue-primary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 justify-center">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-blue-primary'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = productId ? productsData[productId] : null;

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product) return;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelector('.hero-content'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
          }
        );
      }

      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(
          statItems,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (galleryRef.current) {
        gsap.fromTo(
          galleryRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-text-secondary mb-6">The product you are looking for does not exist.</p>
          <Link to="/products" className="inline-flex items-center gap-2 text-cyan-secondary hover:underline">
            <ArrowLeft size={18} /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const ProductIcon = product.icon;

  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="hero-content">
            {/* Back Button */}
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              Back to Products
            </button>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center">
                    <ProductIcon className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-cyan-secondary/10 border border-cyan-secondary/30 text-cyan-secondary text-sm font-medium">
                    Enterprise Solution
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {product.title}
                </h1>
                <p className="text-xl lg:text-2xl text-cyan-secondary mb-6">
                  {product.tagline}
                </p>
                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                  {product.fullDescription}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl gradient-bg text-white font-semibold transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:shadow-glow-lg"
                  >
                    Get Started
                    <ArrowRight size={18} />
                  </Link>
                  <a
                    href="#features"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:border-white/40 hover:bg-white/5"
                  >
                    Explore Features
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-primary/20 to-cyan-secondary/20 rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-gray-100 to-white">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="py-16 bg-dark-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {product.stats.map((stat) => (
              <div key={stat.label} className="stat-item text-center">
                <p className="text-3xl lg:text-4xl font-bold gradient-text mb-1">{stat.value}</p>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" ref={featuresRef} className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-text-secondary">
              Everything you need to streamline your operations and boost productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card bg-dark-surface rounded-2xl p-6 border border-white/5 transition-all duration-300 ease-expo-out hover:border-blue-primary/30 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-primary/10 flex items-center justify-center mb-4">
                  {index % 3 === 0 ? <Zap className="w-6 h-6 text-cyan-secondary" /> :
                   index % 3 === 1 ? <Shield className="w-6 h-6 text-cyan-secondary" /> :
                   <Star className="w-6 h-6 text-cyan-secondary" />}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div ref={galleryRef} className="py-20 lg:py-32 bg-dark-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              See It In <span className="gradient-text">Action</span>
            </h2>
            <p className="text-text-secondary">
              Explore the intuitive interface and powerful features of our dashboard
            </p>
          </div>

          <ImageGallery images={product.gallery} />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Why Choose <span className="gradient-text">{product.title}</span>?
              </h2>
              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                Join thousands of businesses that have transformed their operations with our solution.
              </p>

              <div className="space-y-4">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-cyan-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-cyan-secondary" />
                    </div>
                    <span className="text-white">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Preview Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-primary/20 to-cyan-secondary/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-gray-100 to-white">
                <img
                  src={product.gallery[1] || product.image}
                  alt="Feature Preview"
                  className="w-full h-auto object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 lg:py-32 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              What Our <span className="gradient-text">Customers Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {product.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-dark rounded-2xl p-8 border border-white/5"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white text-lg mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-text-secondary text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
            Transform your business operations today. Contact us for a personalized demo.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl gradient-bg text-white text-lg font-semibold transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:shadow-glow-lg"
          >
            Request a Demo
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
