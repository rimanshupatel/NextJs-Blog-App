import BgGradient from "@/components/Common/BgGradient"; // Import your BgGradient component
import { Navbar } from "@/components/Home/Header/Navbar";
import TopArticles from "@/components/Home/TopArticles";
import { cn } from "@/lib/utils"; // Import your utility function

export default function Home() {
  return (
    <>
      <BgGradient className="" />
      <div className="min-h-screen ">
        {/* Hero Section with BgGradient */}
        <section className="relative text-foreground bg-transparent py-32 overflow-hidden">
          {/* Use your BgGradient here */}
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-6xl font-bold mb-6 animate-fade-in">
              Transform Your Ideas into Reality
            </h1>
            <p className="text-xl mb-8 animate-fade-in delay-100">
              A platform designed to inspire, create, and innovate. Join us and
              build the future.
            </p>
            <div className="space-x-4 animate-fade-in delay-200">
              <a
                href="#features"
                className="bg-white text-[#6D28D9] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Features
              </a>
              <a
                href="#cta"
                className="bg-[#F59E0B] text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 ">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className=" p-8 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300 animate-fade-in delay-100">
                <div className="text-4xl mb-4 text-[#6D28D9]">🚀</div>
                <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
                <p className="text-gray-600">
                  Experience blazing-fast performance with our cutting-edge
                  technology.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300 animate-fade-in delay-200">
                <div className="text-4xl mb-4 text-[#F59E0B]">✨</div>
                <h3 className="text-2xl font-bold mb-4">Sleek Design</h3>
                <p className="text-gray-600">
                  Modern and intuitive design that captivates your audience.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300 animate-fade-in delay-300">
                <div className="text-4xl mb-4 text-[#10B981]">🔒</div>
                <h3 className="text-2xl font-bold mb-4">Secure & Reliable</h3>
                <p className="text-gray-600">
                  Your data is safe with our top-tier security measures.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* top articles */}
        <div className="container mx-auto px-6">
          <h1 className="my-4 font-bold text-3xl">Top Articles</h1>
          <TopArticles />
        </div>

        {/* Testimonials Section */}
        <section className="py-20 text-black">
          {/* Content */}
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 animate-fade-in delay-100">
                <p className="mb-4">
                  "This platform has completely transformed the way I work.
                  Highly recommend!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <p className="font-bold">John Doe</p>
                    <p className="text-sm text-gray-300">CEO, Company XYZ</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 animate-fade-in delay-200">
                <p className="mb-4">
                  "Incredible experience from start to finish. The team is
                  amazing!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <p className="font-bold">Jane Smith</p>
                    <p className="text-sm text-gray-300">
                      Founder, Startup ABC
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section id="cta" className="py-20 ">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in">
              Ready to Join Us?
            </h2>
            <p className="text-xl mb-8 animate-fade-in delay-100">
              Sign up today and start your journey with the best in the
              industry.
            </p>
            <a
              href="#"
              className="bg-[#6D28D9] text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg hover:shadow-xl animate-fade-in delay-200"
            >
              Sign Up Now
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
