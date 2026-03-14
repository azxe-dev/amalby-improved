"use client";

import React from "react";
import LegalLayout, { LegalSection } from "@/components/layout/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout 
      title="Terms of Service" 
      subtitle="These terms govern your partnership with Amalby and the utilization of our proprietary AI implementation frameworks."
    >
      <LegalSection title="1. Engagement & Scope">
        <p className="mb-4">
          By engaging Amalby for AI implementation or advisory services, you agree to provide the necessary access to systems, data, and personnel required to achieve the project objectives defined in our Statement of Work (SOW).
        </p>
        <p>
          Amalby reserves the right to decline or terminate projects that involve the development of unethical, harmful, or illegal AI applications.
        </p>
      </LegalSection>

      <LegalSection title="2. Intellectual Property Rights">
        <p className="mb-4">
          All custom-developed agents, prompts, and orchestration workflows created specifically for the client are the sole property of the client upon final payment.
        </p>
        <p>
          Amalby retains ownership of any pre-existing internal frameworks, codebase templates, and boilerplate components used during the implementation process, granting the client a non-exclusive license to use these elements as part of the delivered solution.
        </p>
      </LegalSection>

      <LegalSection title="3. AI Performance & Accuracy">
        <p className="mb-4">
          The client acknowledges that LLMs (Large Language Models) are non-deterministic and can produce incorrect information (hallucinations).
        </p>
        <p>
          While Amalby implements rigorous prompt engineering and Retrieval-Augmented Generation (RAG) to maximize accuracy, we are not responsible for decisions made by AI agents or for outcomes resulting from LLM-generated outputs.
        </p>
      </LegalSection>

      <LegalSection title="4. Payment & Cancellation">
        <p className="mb-4">
          Invoices are payable within 14 days of receipt. Project milestone payments are non-refundable once the work for that phase has commenced.
        </p>
        <p>
          Either party may terminate a project with 30 days notice. In such cases, the client must pay for all work completed up to the date of termination.
        </p>
      </LegalSection>

      <LegalSection title="5. Limitation of Liability">
        <p>
          Amalby is not liable for indirect, incidental, or consequential damages (including loss of revenue or data) arising from the implementation or failure of AI systems. Our maximum liability is limited to the fees paid for the specific project phase that caused the loss.
        </p>
      </LegalSection>

      <LegalSection title="6. Contact">
        <p>
          For any legal inquiries regarding these terms, please contact <a href="mailto:legal@amalby.com" className="text-black underline underline-offset-4 decoration-black/10 hover:decoration-black transition-colors">legal@amalby.com</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
