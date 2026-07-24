// Reusable wave divider — creates a soft transition between two section
// background colors instead of a hard cut. Drop one of these between
// every two sections in Home.jsx.
const SectionDivider = ({ topColor = "#ffffff", bottomColor = "#f7f2ff", flip = false }) => {
  return (
    <div className="relative h-14 w-full overflow-hidden lg:h-20" style={{ backgroundColor: topColor }}>
      <svg
        className={`absolute bottom-0 left-0 h-full w-full ${flip ? "rotate-180" : ""}`}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,45 C240,90 480,10 720,40 C960,70 1200,20 1440,50 L1440,100 L0,100 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;