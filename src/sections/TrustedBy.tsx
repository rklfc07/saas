import { Building2, Landmark, Store, Factory, Briefcase, Hospital } from 'lucide-react';

const TrustedBy = () => {
  const companies = [
    { name: 'TechCorp', icon: Building2 },
    { name: 'MediCare Plus', icon: Hospital },
    { name: 'PharmaGlobal', icon: Factory },
    { name: 'RetailMax', icon: Store },
    { name: 'FinanceHub', icon: Landmark },
    { name: 'BusinessPro', icon: Briefcase },
  ];

  // Duplicate for seamless loop
  const allCompanies = [...companies, ...companies];

  return (
    <section className="py-16 bg-dark relative overflow-hidden">
      {/* Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-text-secondary text-sm font-medium uppercase tracking-wider">
          Trusted by innovative companies
        </p>
      </div>

      {/* Logo Carousel */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-carousel">
          {allCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center gap-3 px-10 group cursor-pointer"
            >
              <company.icon
                size={28}
                className="text-text-secondary/50 group-hover:text-white transition-all duration-200 group-hover:scale-110"
              />
              <span className="text-lg font-semibold text-text-secondary/50 group-hover:text-white transition-colors duration-200 whitespace-nowrap">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
