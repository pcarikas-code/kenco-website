import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-secondary/5 via-primary/5 to-background py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">About Kenco Ltd.</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Your trusted partner in infection control solutions for healthcare facilities across New Zealand.
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-secondary mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    We partner with Infection Control and Procurement leaders to deliver solutions that are clinically effective, operationally efficient, and financially sound. Our commitment is to provide innovative products and services that enhance patient safety and improve healthcare facility operations.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Endurocide® curtains can reduce curtain-related costs by eliminating laundering and reducing change frequency, while maintaining the highest standards of infection control.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">Clinical Effectiveness</h3>
                  <p className="text-muted-foreground">
                    We prioritize evidence-based solutions that deliver proven infection control outcomes for healthcare facilities and their patients.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">Operational Efficiency</h3>
                  <p className="text-muted-foreground">
                    Our solutions streamline workflows and reduce operational costs while maintaining the highest standards of care and safety.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">Financial Soundness</h3>
                  <p className="text-muted-foreground">
                    We deliver cost-effective solutions that provide excellent value while supporting long-term sustainability for healthcare organizations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
                Why Choose Kenco?
              </h2>
              <div className="space-y-6">
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary mb-2">Proven Track Record</h3>
                        <p className="text-muted-foreground">
                          Years of experience delivering infection control solutions to healthcare facilities across New Zealand.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary mb-2">Quality Products</h3>
                        <p className="text-muted-foreground">
                          We offer only the highest quality infection control products, including our flagship Endurocide® antimicrobial curtains.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary mb-2">Comprehensive Service</h3>
                        <p className="text-muted-foreground">
                          From consultation to installation and ongoing support, we provide complete service coverage nationwide.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary mb-2">Partnership Approach</h3>
                        <p className="text-muted-foreground">
                          We work closely with infection control and procurement leaders to understand and meet their specific needs.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary text-secondary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Partner with Us?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Contact us today to learn how we can support your infection control needs.
              </p>
              <Button asChild size="lg" variant="outline" className="bg-background text-secondary hover:bg-background/90">
                <Link href="/contact">Get Connected</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
