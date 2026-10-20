
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#10091d] px-5 py-12 text-white sm:px-10">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="font-bold text-cyan-300 hover:text-fuchsia-300">
          ← Back to Vybe AI
        </a>

        <p className="mt-10 text-sm font-bold tracking-widest text-fuchsia-300">
          VYBE AI
        </p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm text-purple-100/50">
          Last updated: October 20, 2026
        </p>

        <div className="mt-10 space-y-8 leading-7 text-purple-100/80">
          <section>
            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
            <p className="mt-2">
              Welcome to Vybe AI, created by Raghav Gulati. By accessing or
              using this website, you agree to these Terms &amp; Conditions.
              If you do not agree, please stop using the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">2. About the service</h2>
            <p className="mt-2">
              Vybe AI is designed to help users discover activities, games,
              mood-based experiences and entertainment ideas. Features may
              change, be updated or become unavailable over time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">3. Acceptable use</h2>
            <p className="mt-2">
              You agree not to misuse the website, interfere with its
              operation, attempt unauthorized access, distribute harmful
              content or use the service for unlawful purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">4. AI-generated content</h2>
            <p className="mt-2">
              AI-generated suggestions may be incomplete, inaccurate or
              unsuitable for a particular situation. Use your own judgment
              before acting on them. Vybe AI is intended for entertainment
              and general discovery, not professional medical, legal or
              financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">5. Intellectual property</h2>
            <p className="mt-2">
              Website branding, original designs and other original materials
              may be protected by applicable intellectual property laws.
              You may not copy or redistribute protected material without
              permission, except where the law allows it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">6. Third-party services</h2>
            <p className="mt-2">
              Some features may rely on third-party websites or services.
              Their availability and terms are controlled by their respective
              providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">7. Availability and liability</h2>
            <p className="mt-2">
              Vybe AI is provided on an as-available basis. To the extent
              permitted by applicable law, we do not guarantee uninterrupted
              operation or that every suggestion will meet your expectations.
              Nothing in these terms excludes rights or liabilities that
              cannot legally be excluded.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">8. Changes to these terms</h2>
            <p className="mt-2">
              These terms may be updated as the service develops. The latest
              version will be published on this page with its revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">9. Contact</h2>
            <p className="mt-2">
              For questions about these terms, please use the official contact
              method provided on the Vybe AI website.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-purple-100/50">
          © 2026 Vybe AI · Created by Raghav Gulati
        </div>
      </div>
    </main>
  );
}
