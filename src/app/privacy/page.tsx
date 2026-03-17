"use client";

import React from "react";
import LegalLayout, { LegalSection } from "@/components/layout/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout 
      title="Privacy Notice" 
      subtitle="How Amalby collects, uses, and protects your personal data. We keep this plain and honest."
    >
      <LegalSection title="1. Data Collection">
        <p className="mb-4">
          We collect only the data necessary to scope and deliver your project. This includes contact details you provide, project briefs, and any materials you share with us during an engagement.
        </p>
        <p>
          We do not sell, trade, or transfer your data to third parties without your explicit consent.
        </p>
      </LegalSection>

      <LegalSection title="2. Project Data &amp; Intellectual Property">
        <p className="mb-4">
          Any data, materials, or assets you provide during a project remain your property. We do not use client data to train models for other clients or for internal purposes without explicit permission.
        </p>
        <p>
          Where possible, we work with tools and environments that keep your data within your own control.
        </p>
      </LegalSection>

      <LegalSection title="3. Security">
        <p className="mb-4">
          We take reasonable steps to protect your information. Access to project materials is limited to people who need it, and we use standard encryption for data in transit.
        </p>
        <p>
          Amalby is a small, focused team. We do not claim enterprise-grade infrastructure, but we handle your data carefully and never share it unnecessarily.
        </p>
      </LegalSection>

      <LegalSection title="4. Cookies &amp; Tracking">
        <p>
          This website uses minimal operational cookies. We do not use third-party tracking pixels or cross-site advertising tools.
        </p>
      </LegalSection>

      <LegalSection title="5. Your Rights (GDPR / UK GDPR)">
        <p>
          If you are based in the EU or UK, you have rights over your personal data, including the right to access, correct, or request deletion of data we hold about you. To exercise any of these rights, contact us at <a href="mailto:hello@amalby.com" className="text-black underline underline-offset-4 decoration-black/10 hover:decoration-black transition-colors">hello@amalby.com</a>.
        </p>
      </LegalSection>

      <LegalSection title="6. Contact">
        <p>
          Questions about this notice? Email us at <a href="mailto:hello@amalby.com" className="text-black underline underline-offset-4 decoration-black/10 hover:decoration-black transition-colors">hello@amalby.com</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
