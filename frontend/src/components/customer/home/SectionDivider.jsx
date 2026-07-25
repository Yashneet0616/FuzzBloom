const SectionDivider = ({ 
  topColor = "#ffffff", 
  bottomColor = "#f7f2ff", 
  flip = false,
  variant = "gentle" // Options: "gentle", "deep", "slope"
}) => {
  // Curated, silky-smooth wave paths for a premium floral aesthetic
  const paths = {
    gentle: "M0,32 C320,70 420,0 720,32 C1020,64 1120,10 1440,40 L1440,100 L0,100 Z",
    deep: "M0,20 C360,90 1080,90 1440,20 L1440,100 L0,100 Z",
    slope: "M0,60 C480,10 960,100 1440,30 L1440,100 L0,100 Z"
  };

  return (
    <div 
      className="relative h-12 w-full overflow-hidden sm:h-16 lg:h-24 pointer-events-none select-none" 
      style={{ backgroundColor: topColor }}
    >
      <svg
        className={`absolute bottom-0 left-0 h-full w-full ${flip ? "rotate-180" : ""}`}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d={paths[variant] || paths.gentle}
          fill={bottomColor}
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  );
};

export default SectionDivider;