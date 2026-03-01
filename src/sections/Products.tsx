import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Pill, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  features: string[];
}

const products: Product[] = [
  {
    id: 'lab-management',
    title: 'Lab Management',
    description: 'Streamline your laboratory operations with our comprehensive management system. Track samples, manage workflows, and ensure compliance.',
    icon: FlaskConical,
    image: '/images/lab/lab1.png',
    features: ['Sample Tracking', 'Workflow Automation', 'Compliance Reports'],
  },
  {
    id: 'pharma-distribution',
    title: 'Pharma Distribution',
    description: 'Efficiently manage your pharmaceutical distribution with our specialized software. Track inventory, orders, and deliveries in real-time.',
    icon: Pill,
    image: '/images/pharma/pharma2.png',
    features: ['Inventory Management', 'Order Tracking', 'Delivery Optimization'],
  },
  {
    id: 'crm-software',
    title: 'CRM Software',
    description: 'Build stronger customer relationships with our intuitive CRM platform. Manage leads, track interactions, and close more deals.',
    icon: Users,
    image: '/images/crm/crm2.png',
    features: ['Lead Management', 'Sales Pipeline', 'Customer Analytics'],
  },
];

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { rotateY: -30, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.15,
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative bg-dark-surface rounded-2xl overflow-hidden transition-all duration-400 ease-expo-out hover:-translate-y-3 hover:shadow-card-hover perspective-1000"
      style={{ transformStyle: 'preserve-3d', transform: 'rotateX(2deg)' }}
    >
      {/* Gradient Border on Hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-blue-primary to-cyan-secondary">
          <div className="w-full h-full rounded-2xl bg-dark-surface" />
        </div>
      </div>

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-b from-gray-100 to-white">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-top transition-all duration-500 ease-smooth group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark-surface/30 to-transparent" />
        
        {/* Icon Badge */}
        <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-dark-surface/90 backdrop-blur-sm border border-white/10 flex items-center justify-center">
          <product.icon className="w-6 h-6 text-cyan-secondary" />
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 transition-transform duration-300 ease-expo-out group-hover:-translate-y-1">
        <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1 text-xs font-medium text-cyan-secondary bg-cyan-secondary/10 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to={`/products/${product.id}`}
          className="inline-flex items-center gap-2 text-white font-semibold text-sm group/link"
        >
          <span className="relative">
            Learn More
            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-blue-primary to-cyan-secondary transform origin-left transition-transform duration-250 ease-expo-out scale-x-100" />
          </span>
          <ArrowRight
            size={16}
            className="transition-transform duration-200 ease-expo-out group-hover/link:translate-x-2"
          />
        </Link>
      </div>
    </div>
  );
};

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const heading = headerRef.current.querySelector('h2');
        const subheading = headerRef.current.querySelector('p');

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
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          subheading,
          { y: 20, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'smooth',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-dark relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="gradient-text">Products</span>
          </h2>
          <p className="text-text-secondary text-lg">
            Discover our suite of powerful tools designed to streamline your business operations
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/20 text-white font-semibold transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:border-white/40 hover:bg-white/5"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
