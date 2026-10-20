"use client";

export default function PrivacyPage() {
  const updated = "October 19, 2026";

  return (
    <main className="min-h-screen bg-[#10091d] px-5 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-xl font-black">
          <span className="text-fuchsia-400">✳</span> VYBE
          <span className="text-cyan-300">AI</span>
        </a>

        <p className="mt-12 text-sm font-bold tracking-widest text-fuchsia-300">
          YOUR INFORMATION MATTERS
        </p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-purple-100/50">
          Last updated: {updated}
        </p>

        <div className="mt-10 space-y-8 leading-7 text-purple-100/75">
          <section>
            <h2 className="mb-3 text-xl font-bold text-white">1. Introduction</h2>
            <p>
              This policy explains how information may be handled when you
              visit VYBE AI, which offers games, quizzes, mood-based activities,
              and entertainment features. The actual information collected
              depends on how the website and its hosting services are configured.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">2. Information You Provide</h2>
            <p>
              Some activities may ask you to select a mood, choose an answer,
              or interact with a game. Do not enter passwords, financial
              information, sensitive personal details, or private information
              about other people into free-text fields.
            </p>
            <p className="mt-3">
              Whether selections or responses are saved depends on the
              functionality of the specific feature. Do not assume that
              information is automatically deleted or never stored.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">3. Technical Information</h2>
            <p>
              Website hosting and security services may process technical
              information such as IP address, browser type, device details,
              request logs, and pages requested. The precise data depends on
              the hosting configuration and services in use.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">4. Cookies and Similar Technologies</h2>
            <p>
              VYBE AI or its service providers may use cookies or similar
              technologies if enabled for essential operation, security,
              preferences, or analytics. Check the website's actual
              configuration before relying on this description.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">5. How Information May Be Used</h2>
            <p>Depending on the services enabled, information may be used to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Operate and display website features.</li>
              <li>Maintain website security and troubleshoot errors.</li>
              <li>Understand performance if analytics are enabled.</li>
              <li>Respond to messages if a contact method is provided.</li>
              <li>Meet applicable legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">6. Service Providers</h2>
            <p>
              The website may rely on hosting, security, or other technical
              providers. Those providers may process information as needed to
              deliver their services, subject to their applicable terms and
              privacy practices.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">7. Sharing and Sale of Information</h2>
            <p>
              The website operator should describe any actual sharing or sale
              of personal information here after reviewing the services and
              integrations in use. Do not assume that no sharing occurs simply
              because the website does not ask you to create an account.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">8. Data Security and Retention</h2>
            <p>
              Reasonable safeguards should be used to protect information.
              No internet transmission or storage method can be guaranteed
              completely secure. Retention periods depend on the information,
              purpose, and service configuration.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">9. Your Choices and Rights</h2>
            <p>
              Depending on applicable law, you may have rights to request
              access to, correction of, or deletion of personal information,
              or to raise a privacy concern. Requests can be directed to the
              website operator using an official contact method published
              on the website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">10. Children&apos;s Privacy</h2>
            <p>
              VYBE AI is not intended to encourage children to share personal
              or sensitive information. Parents and guardians should guide
              children's online activities. The operator should establish
              and publish age-appropriate rules consistent with applicable law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">11. Policy Updates</h2>
            <p>
              This policy may be updated as features and services change.
              Updates will be published here with a revised date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">12. Contact</h2>
            <p>
              For privacy questions or requests, contact the VYBE AI website
              operator through an official contact method published on the website.
            </p>
          </section>

          <p className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/5 p-4 text-sm text-purple-100/70">
            Website owner: Before publishing, review this policy against the
            actual data collected by your website, hosting provider, and any
            analytics or third-party integrations.
          </p>
        </div>

        <footer className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-purple-100/40">
          © 2026 VYBE AI · <a href="/terms" className="hover:text-cyan-300">Terms & Conditions</a>
          {" · "}
          <a href="/" className="hover:text-cyan-300">Home</a>
          <p className="mt-3">Created with ♥ by Raghav Gulati</p>
        </footer>
      </div>
    </main>
  );
}