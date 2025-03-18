"use client"
import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { useRef } from "react";
import TitleScreen from "@/app/_components/TitleScreen";
import { ThemeSwitcher } from "@/app/_components/theme-switcher";
import AboutMe from "@/app/_components/AboutMe";

export default function Index() {
  return (
    <main>
      <div>
        <TitleScreen />
      </div>
      <Container>
        <div className="mt-10"></div>
        <AboutMe />
        {/* <ThemeSwitcher /> */}
      </Container>
    </main>
  );
}




// import Container from "@/app/_components/container";
// import { HeroPost } from "@/app/_components/hero-post";
// import { Intro } from "@/app/_components/intro";
// import { MoreStories } from "@/app/_components/more-stories";
// import { getAllPosts } from "@/lib/api";

// export default function Index() {
//   const allPosts = getAllPosts();

//   const heroPost = allPosts[0];

//   const morePosts = allPosts.slice(1);

//   return (
//     <main>
//       <Container>
//         <Intro />

//         {/* Persönliche Vorstellung */}
//         <section className="mt-10 text-center md:text-left">
//           <h2 className="text-3xl font-bold">Über mich</h2>
//           <p className="mt-4 text-lg">
//             Hallo, ich bin Claude Widmer, ein GIS-Enthusiast mit einem starken Interesse 
//             an WebGIS, QGIS, Python und Data Science. Derzeit studiere ich im Master 
//             Geographie mit Fokus auf GIS an der Universität Zürich.  
//           </p>
//         </section>

//         {/* Interessen */}
//         <section className="mt-10">
//           <h2 className="text-3xl font-bold">Meine Interessen</h2>
//           <ul className="mt-4 list-disc list-inside text-lg">
//             <li>Geoinformationssysteme (GIS) & räumliche Analysen</li>
//             <li>WebGIS & interaktive Kartenvisualisierungen</li>
//             <li>QGIS und Open-Source-GIS-Technologien</li>
//             <li>Python für Geodatenverarbeitung & Automatisierung</li>
//             <li>Data Science & Machine Learning für raumbezogene Daten</li>
//           </ul>
//         </section>

//         {/* Hauptartikel und weitere Stories */}
//         <HeroPost
//           title={heroPost.title}
//           coverImage={heroPost.coverImage}
//           date={heroPost.date}
//           author={heroPost.author}
//           slug={heroPost.slug}
//           excerpt={heroPost.excerpt}
//         />
//         {morePosts.length > 0 && <MoreStories posts={morePosts} />}
//       </Container>
//     </main>
//   );
// }
