import A from "../../assets/a.svg";
import B from "../../assets/b.svg";
import C from "../../assets/c.svg";
import D from "../../assets/d.svg";
import E from "../../assets/e.svg";

export function InformationWebsite() {
    return (
        <div className="bg-white w-full h-lvh flex relative items-center justify-center ">
        <img
          src={A}
          loading="lazy"
          alt="a"
          className="absolute top-2 right-[40%] w-[80px] md:w-[230px]  "
        />
        <img
          src={B}
          loading="lazy"
          alt="a"
          className="absolute top-[30%] right-[8%] w-[80px] md:w-[230px]  "
        />
        <img
          src={C}
          loading="lazy"
          alt="a"
          className="absolute top-[30%] left-[5%] w-[80px] md:w-[230px]  "
        />
        <img
          src={D}
          loading="lazy"
          alt="a"
          className="absolute top-[60%] left-0 w-[80px] md:w-[230px]  "
        />
        <img
          src={E}
          loading="lazy"
          alt="a"
          className="absolute bottom-[10%] right-0 w-[80px] md:w-[230px]  "
        />
        <div className="flex justify-center w-full z-1 md:w-[50%] gap-2.5 items-center flex-col p-2 text-gray-900 ">
          <h1 className="gentium-plus-bold text-2xl md:text-5xl ">
            Creating perfect lines and imposing presence{" "}
          </h1>
          <p className=" text-xs md:text-lg font-sans  ">
            Developed the concept of exclusivity, a Arusa features timeless
            furniture, with natural fabrics, curved lines, plenty of mirrors and
            classic design, which can be incorporated into any decor project.
            The pieces enchant for their sobriety, to last for generations,
            faithful to the shapes of each period, with a touch of the present.
          </p>
        </div>
      </div>
    )
}