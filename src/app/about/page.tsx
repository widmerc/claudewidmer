import React from "react";
import SkillCard from "@/app/_components/SkillCard";
import PageWrapper from "@/app/_components/PageWrapper";
import Navbar from "@/app/_components/Navbar";
import Container from "@/app/_components/container";
import AboutMe from "@/app/_components/AboutMeShort";
import CV from "@/app/_components/CV";
import SkillRadar from "@/app/_components/SkillRadar";




const About: React.FC = () => {
  return (
    <Container>
<Navbar />
<SkillRadar />

<CV />
    </Container>
  )

};

export default About;
