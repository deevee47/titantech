export const BackgroundBlobs = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute w-96 h-96 rounded-full bg-purple-600/30 blur-3xl"
        style={{
          top: "20%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          animation: "blob1 7s infinite ease-in-out",
        }}
      />
      <div
        className="absolute w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"
        style={{
          top: "60%",
          left: "30%",
          transform: "translate(-50%, -50%)",
          animation: "blob2 8s infinite ease-in-out",
        }}
      />
    </div>
  );