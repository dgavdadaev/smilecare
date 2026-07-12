import { Smile } from "lucide-react";
import { gradBg } from "../theme/tokens";

/* ================================ Loader ================================ */
export function Loader({ hidden }) {
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center animate-[pulseScale_1.1s_ease-in-out_infinite]" style={gradBg}>
          <Smile size={30} color="#fff" />
        </div>
        <div className="mt-5 w-32 h-1 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full animate-[loaderBar_0.9s_ease-in-out_infinite]" style={gradBg} />
        </div>
      </div>
    </div>
  );
}
