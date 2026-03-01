import Hero from '../sections/Hero';
import TrustedBy from '../sections/TrustedBy';
import About from '../sections/About';
import Products from '../sections/Products';
import CTA from '../sections/CTA';

const Home = () => {
  return (
    <div className="bg-dark">
      <Hero />
      <TrustedBy />
      <About />
      <Products />
      <CTA />
    </div>
  );
};

export default Home;
