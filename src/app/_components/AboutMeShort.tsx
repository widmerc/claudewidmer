import React from "react";
import PageWrapper from "@/app/_components/PageWrapper";
import AboutMeButton from "@/app/_components/Fancy_About_Me_Button";

const AboutMe: React.FC = () => {
  return (
<section id="about">
        <PageWrapper>
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600  max-w-2xl mx-auto leading-relaxed">
            Ich bin <span className="font-semibold text-accent-3">Claude Widmer</span> und arbeite im GIS-Bereich. Privat beschäftige ich mich mit Web-Technologien und datenbasierten Projekten.
          </p>
        </div>


        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Möchtest du mehr über mich erfahren?</h3>
          <AboutMeButton />
        </div>
      </PageWrapper>
    </section>
  );
};

export default AboutMe;
