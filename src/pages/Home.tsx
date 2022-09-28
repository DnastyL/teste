import { ReactNode } from "react";


type HomeType = {
    children?: ReactNode
}
export const Home = ({children} : HomeType) => {
  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      {children}
    </div>
  );
};
