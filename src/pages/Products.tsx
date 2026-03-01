import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Pill, Users, Check, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  title: string;
  shortDesc: string;
  fullDescription: string;
  icon: React.ElementType;
  image: string;
  gallery: string[];
  features: { title: string; description: string }[];
  benefits: string[];
  targetAudience: string;
}

const products: Product[] = [
  {
    id: 'lab-management',
    title: 'Lab Management System',
    shortDesc: 'Streamline your laboratory operations',
    fullDescription: 'Our comprehensive Lab Management System helps you track samples, manage workflows, ensure compliance, and improve overall laboratory efficiency. Designed for modern labs of all sizes.',
    icon: FlaskConical,
    image: '/images/lab/lab1.png',
    gallery: [
      '/images/lab/lab2.png',
      '/images/lab/lab3.png',
      '/images/lab/lab4.png',
      '/images/lab/lab5.png',
    ],
    features: [
      { title: 'Sample Tracking & Management', description: 'Track every sample from collection to result with barcode scanning and real-time status updates.' },
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
    targetAudience: 'Diagnostic Labs, Research Facilities, Pathology Centers',
  },
  {
    id: 'pharma-distribution',
    title: 'Pharma Distribution',
    shortDesc: 'Efficient medicine distribution management',
    fullDescription: 'Specialized software for pharmaceutical distributors to manage inventory, track orders, optimize deliveries, and maintain regulatory compliance across the entire supply chain.',
    icon: Pill,
    image: '/images/pharma/pharma2.png',
    gallery: [
      '/images/pharma/pharma1.png',
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
    targetAudience: 'Pharma Distributors, Stockists, Retail Chains',
  },
  {
    id: 'crm-software',
    title: 'CRM Software',
    shortDesc: 'Build stronger customer relationships',
    fullDescription: 'An intuitive CRM platform that helps businesses manage leads, track customer interactions, automate sales processes, and close more deals with data-driven insights.',
    icon: Users,
    image: '/images/crm/crm2.png',
    gallery: [
      '/images/crm/crm1.png',
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
    targetAudience: 'Educational Institutes, Sales Teams, Service Businesses',
  },
];

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.1,
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const ProductIcon = product.icon;

  return (
    <div
      ref={cardRef}
      className="group relative bg-dark-surface rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 ease-expo-out hover:border-blue-primary/30 hover:shadow-card-hover"
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-64 lg:h-auto overflow-hidden bg-gradient-to-b from-gray-100 to-white">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-smooth group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-surface via-dark-surface/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-dark-surface/30 lg:to-dark-surface" />
          
          {/* Icon Badge */}
          <div className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-dark-surface/90 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <ProductIcon className="w-7 h-7 text-cyan-secondary" />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <span className="text-cyan-secondary text-sm font-semibold uppercase tracking-wider mb-2">
            {product.targetAudience}
          </span>
          
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            {product.title}
          </h3>
          
          <p className="text-text-secondary leading-relaxed mb-6">
            {product.fullDescription}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {product.features.slice(0, 4).map((feature) => (
              <div key={feature.title} className="flex items-center gap-2">
                <Check size={16} className="text-cyan-secondary flex-shrink-0" />
                <span className="text-sm text-text-secondary">{feature.title}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:shadow-glow w-fit group/link"
          >
            Explore Details
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const heading = headerRef.current.querySelector('h1');
        const subheading = headerRef.current.querySelector('p');

        gsap.fromTo(
          heading,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          subheading,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'smooth',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-dark pt-24 pb-20">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-primary/10 border border-blue-primary/20 mb-6">
            <Sparkles size={16} className="text-cyan-secondary" />
            <span className="text-sm text-cyan-secondary font-medium">Our Solutions</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Powerful <span className="gradient-text">SaaS Products</span>
          </h1>
          
          <p className="text-text-secondary text-lg leading-relaxed">
            Discover our suite of intelligent solutions designed to transform your business operations. 
            From lab management to customer relationships, we have the tools you need to succeed.
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-br from-blue-primary/20 to-cyan-secondary/20 rounded-3xl p-8 lg:p-12 text-center border border-white/10">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            We can tailor our products to meet your specific business requirements. Let's discuss how we can help.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-bg text-white font-semibold transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:shadow-glow-lg"
          >
            Contact Us
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
