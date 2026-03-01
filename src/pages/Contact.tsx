import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    product: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.animate-item'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Form animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Info animation
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@gyaaniworld.com',
      href: 'mailto:contact@gyaaniworld.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 98765 43210',
      href: 'tel:+919876543210',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: '123 Tech Park, Bangalore, India',
      href: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-dark pt-24 pb-20">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="animate-item inline-block text-cyan-secondary text-sm font-semibold uppercase tracking-wider mb-4">
            Get in Touch
          </span>
          <h1 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="animate-item text-text-secondary text-lg leading-relaxed">
            Have a question or want to learn more about our products? We'd love to hear from you.
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="bg-dark-surface rounded-3xl p-8 lg:p-12 border border-white/5 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-text-secondary mb-8">
                  Your message has been sent successfully. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      product: '',
                      message: '',
                    });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:shadow-glow"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-dark-surface rounded-3xl p-8 lg:p-10 border border-white/5"
              >
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-secondary/50 focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20 transition-all duration-200 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-secondary/50 focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20 transition-all duration-200 outline-none"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="company" className="block text-white font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-secondary/50 focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20 transition-all duration-200 outline-none"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="product" className="block text-white font-medium mb-2">
                      Interested Product
                    </label>
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20 transition-all duration-200 outline-none appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-dark-surface">Select a product</option>
                      <option value="lab-management" className="bg-dark-surface">Lab Management</option>
                      <option value="pharma-distribution" className="bg-dark-surface">Pharma Distribution</option>
                      <option value="crm-software" className="bg-dark-surface">CRM Software</option>
                      <option value="custom" className="bg-dark-surface">Custom Solution</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-secondary/50 focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20 transition-all duration-200 outline-none resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl gradient-bg text-white font-semibold transition-all duration-300 ease-expo-out hover:-translate-y-1 hover:shadow-glow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            {contactInfo.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-start gap-4 p-6 rounded-2xl bg-dark-surface border border-white/5 transition-all duration-300 ease-expo-out hover:border-blue-primary/30 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-primary/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-blue-primary/20">
                  <item.icon className="w-6 h-6 text-cyan-secondary" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.content}</p>
                </div>
              </a>
            ))}

            {/* Business Hours */}
            <div className="p-6 rounded-2xl bg-dark-surface border border-white/5">
              <h3 className="text-white font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Sunday</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-primary/20 to-cyan-secondary/20 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Quick Response</h3>
              <p className="text-text-secondary text-sm">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
