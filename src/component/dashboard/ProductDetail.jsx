import Info from "../../assets/Info.svg";

export function DetailProduct() {
  return (
    <div className="bg-blue-950 md:flex-row flex-col-reverse w-full h-lvh flex relative items-center justify-between ">
      <div className="w-full md:w-[50%] h-full flex justify-center items-center">
        <div className="flex h-1/2 w-full md:w-[70%] p-1 md:p-3 flex-col justify-center gap-1 md:gap-5">
          <h2 className="gentium-plus-bold text-2xl font-bold">
            Native light chair
          </h2>
          <p className="gentium-plus-regular text-xs">
            Refinement Chair with Ripped Seat, made of retro Eucalyptus wood, of
            great resistance, Kiln dried, made with a spike system and painted
            with P.U. (Polyurethane) With its entire structure painted in wood,
            it offers a lot of elegance to your environment and when cleaning is
            very easy, as it is washable and light for movement. Enough of
            receiving visitors and not having a place to accommodate them. With
            the chair, your days as a host will be marked by a lot of elegance
            and sophistication.
          </p>
          <a href="" className="hover:underline hover:underline-offset-8">
            View Product
          </a>
        </div>
      </div>
      <div className="w-full md:w-[50%] h-full">
        <img src={Info} alt="a" className="p-6 md:p-0 md:w-full md:h-full object-cover " />
      </div>
    </div>
  );
}
