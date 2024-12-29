import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const {captain} = useContext(CaptainDataContext);
  const { fullname } = captain;
  return (
    <>
    <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-x-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" className="h-10 w-10 rounded-full"/>
            <h1 className="text-lg font-medium capitalize">{fullname.firstname} {fullname.lastname}</h1>
        </div>
        <div>
            <h1 className="text-xl font-semibold">&#8377;295.20</h1>
            <p className="text-sm text-[#7e7e7e]">Earned</p>
        </div>
    </div>
    <div className="flex items-center justify-between bg-yellow-500/85 my-5 mx-1 p-4 rounded-xl">
        <div className="text-center">
            <i className="text-3xl font-thin ri-time-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-[#7e7e7e]">Hours Online</p>
        </div>
        <div className="text-center">
            <i className="text-3xl font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-[#7e7e7e]">Hours Online</p>
        </div>
        <div className="text-center">
            <i className="text-3xl font-thin ri-money-dollar-box-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-[#7e7e7e]">Hours Online</p>
        </div>
    </div>   
    </>
  )
}

export default CaptainDetails
