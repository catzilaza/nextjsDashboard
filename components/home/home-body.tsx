import HomeLeftSide from "./home-leftside";
import HomeRightSection from "./home-rightsection";

const homebody = () => {
  return (
    <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
      <HomeLeftSide />
      <HomeRightSection />
      <div></div>
    </div>
  );
};

export default homebody;
