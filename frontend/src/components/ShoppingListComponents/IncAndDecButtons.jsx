import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
export default function IncAndDecButtons({
  handleIncrement,
  handleDecrement,
  quantity,
  id,
}) {
  // console.log("id from inc and dec", id);
  return (
    <>
      <div className="border-2 border-black px-1 space-x-2 rounded-lg bg-zinc-200 flex items-center h-min">
        <button
          className="hover:text-blue-500"
          onClick={() => handleDecrement(id)}
        >
          <BiMinus size={15} />
        </button>
        <span className="text-[14px]">{quantity}</span>
        <button
          className="hover:text-blue-500"
          onClick={() => handleIncrement(id)}
        >
          <BiPlus size={15} />
        </button>
      </div>
    </>
  );
}
