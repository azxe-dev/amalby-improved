"use client";

import React from "react";
import LegalLayout, { LegalSection } from "@/components/layout/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout 
      title="Privacy Notice" 
      subtitle="Transparency is at the core of our AI implementation strategy. This notice outlines how Amalby collects, uses, and safeguards your intellectual property."
    >
      <LegalSection title="1. Data Collection">
        <p className="mb-4">
          At Amalby, we only collect data that is strictly necessary for the deployment and training of your bespoke AI agents. This includes architectural specifications, API keys for third-party integrations, and relevant training datasets provided by your organization.
        </p>
        <p>
          We do not sell, trade, or otherwise transfer your identifiable data to outside parties without your explicit, written consent.
        </p>
      </LegalSection>

      <LegalSection title="2. AI Training & Intellectual Property">
        <p className="mb-4">
          All AI models developed or fine-tuned by Amalby for your project remain the exclusive intellectual property of the client. We do not use your proprietary data to train models for other clients or for our own internal tools.
        </p>
        <p>
          We prioritize the use of &quot;Local LLMs&quot; and secure private cloud instances whenever possible to ensure your data never leaves your enterprise perimeter.
        </p>
      </LegalSection>

      <LegalSection title="3. Security Measures">
        <p className="mb-4">
          We implement a variety of security measures to maintain the safety of your sensitive information. These include:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>End-to-end encryption for all data in transit.</li>
          <li>AES-256 encryption for data at rest.</li>
          <li>Strict role-based access controls (RBAC) for all development environments.</li>
          <li>Regular third-party security audits and penetration testing.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Cookies & Tracking">
        <p>
          Our website uses minimal operational cookies to enhance user experience. We do not use intrusive cross-site tracking or third-party marketing pixels that compromise your digital footprint.
        </p>
      </LegalSection>

      <LegalSection title="5. Contact Us">
        <p>
          If you have any questions regarding this privacy notice or our data handling practices, please contact us at <a href="mailto:privacy@amalby.com" className="text-black underline underline-offset-4 decoration-black/10 hover:decoration-black transition-colors">privacy@amalby.com</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
