import LeftSideBar from "@/components/Home/dashboard/LeftSideBar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        <LeftSideBar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
