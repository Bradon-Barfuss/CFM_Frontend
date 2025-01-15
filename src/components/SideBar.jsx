import { IoIosAddCircle } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 bg-blue-500 shadow-slate-400">
            <i>A</i>
            <i>B</i>
            <i>C</i>
            <i>D</i>
            <i>E</i>
            <SideBarItem icon={<IoIosAddCircle />} text="Add" />
            <SideBarItem icon={<IoIosArrowUp />} text="Up" />
            <SideBarItem icon={<IoIosArrowDown />} text="Down" />   
        </div>
    );
};

const SideBarItem = ({ icon, text }) => {
    return (
        <div className="bg-gray-200 rounded-md p-2">
            <i>{icon}</i>
            <i>{text}</i>
        </div>
    );
};
export default SideBar;