export default function TitleScreen() {
    return (
      <section className="relative w-full h-screen overflow-hidden">
        {/* Hintergrundbild */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/img/background.png)', backgroundPosition: 'center', backgroundSize: 'cover' }}
        ></div>
  
        {/* Dunkle Überlagerung für bessere Lesbarkeit */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
  
        {/* SEO-freundlicher Textinhalt */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">Claude Widmer</h1>
          <p className="text-lg md:text-2xl mt-4">GIS-Enthusiast | QGIS | Data Science | Web-GIS</p>
        </div>
  
        {/* Pfeil nach unten */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center">
  <div className="flex flex-col items-center cursor-pointer animate-bounce text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white"
    >
      <path d="M12 19l-7-7h14z"></path>
    </svg>
    <span className="mb-2 text-lg">scroll down</span>

  </div>
</div>
      </section>
    );
  }
  