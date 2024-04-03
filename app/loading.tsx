import { CircularProgress } from "@nextui-org/progress";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <CircularProgress
        aria-label="Loading..."
        classNames={{
          svg: "w-20 h-20 drop-shadow-md",
        }}
      />
    </div>
  );
};

export default LoadingScreen;
