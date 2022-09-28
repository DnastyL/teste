import { Logo } from "../components/Logo";
import { Home } from "./Home";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterTeacher } from "../components/RegisterTeacher";
import { LoginTeacher } from "../components/LoginTeacher";

export const SubscribeTeacher = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  return (
    <Home>
      <div className=" w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto lg:flex-col lg:max-w-full lg:gap-3 ">
        <div className="max-w-[640px] sm:max-w-[330px] sm:flex sm:flex-col sm:items-center">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight sm:text-center sm:text-[2.2rem]">
            Bem-Vindo Instrutor{" "}
            <strong className="text-blue-500">IgniteLab</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed sm:text-center">
            Sinta-se à vontade de colocar seu conteúdo no evento do IgniteLab
          </p>
        </div>
        {location.pathname === "/instructor" ? (
          <RegisterTeacher />
        ) : (
          <LoginTeacher />
        )}
      </div>
      <img src="/src/assets/code-mackup.png" className="mt-10 lg:p-6" alt="" />
    </Home>
  );
};
