import backgroundV from "../../assets/background.mp4";

export function VideoBG() {
  return (
    <div className="w-full relative items-center justify-center flex h-lvh ">
      <video
        autoPlay
        loop
        muted
        className=" w-full h-full absolute object-cover -z-10"
      >
        <source src={backgroundV} type="video/mp4" />
      </video>
      <div className="w-full text-center flex md:w-[50%]">
        <p className="gentium-plus-bold text-2xl md:text-7xl">
          Seamless furniture with natural fabrics
        </p>
      </div>
    </div>
  );
}
