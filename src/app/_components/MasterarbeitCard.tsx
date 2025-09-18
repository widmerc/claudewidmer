import React from "react";
import PageWrapper from "@/app/_components/PageWrapper";
import Link from "next/link";

const MasterarbeitSection: React.FC = () => {
  return (
    <section id="masterarbeit">
      <PageWrapper>
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Momentan arbeite ich noch an meiner{" "}
            <span className="font-semibold text-accent-3">Masterarbeit</span>.
            Hier teile ich den aktuellen Stand meiner Arbeit sowie einige Pläne
            für die nächsten Schritte.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Möchtest du den momentanen Stand meiner Arbeit sehen?
          </h3>
          <Link
            href="/masterarbeit"
            className="inline-block px-6 py-3 rounded-xl bg-accent-3 text-white font-medium shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Zum aktuellen Stand (PDF & Pläne)
          </Link>
        </div>
      </PageWrapper>
    </section>
  );
};

export default MasterarbeitSection;
