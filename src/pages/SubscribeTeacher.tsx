import { Logo } from "../components/Logo";
import { Home } from "./Home";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterTeacher } from "../components/RegisterTeacher";
import { Login } from "../components/Login";
import { ArrowCircleLeft } from "phosphor-react";

export const SubscribeTeacher = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Home>
      <div className=" w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto lg:flex-col lg:max-w-full lg:gap-3 ">
        <div className="max-w-[640px] sm:max-w-[330px] sm:flex sm:flex-col sm:items-center">
          <div className="flex items-center">
            <span
              className="hidden relative right-11 sm:flex hover:text-green-500 hover:cursor-pointer sml:right-3"
              onClick={() => {
                location.pathname === "/instructor/login"
                  ? navigate("/instructor")
                  : navigate("/");
              }}
            >
              <ArrowCircleLeft size={24} />
            </span>
            <Logo />
          </div>
          <h1 className="mt-8 text-[2.5rem] leading-tight sm:text-center sm:text-[2.2rem]">
            Bem-Vindo Instrutor{" "}
            <strong className="text-blue-500">IgniteLab</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed sm:text-center">
            Sinta-se à vontade de colocar seu conteúdo no evento do IgniteLab
          </p>
        </div>
        {location.pathname === "/instructor" ? <RegisterTeacher /> : <Login />}
      </div>
      <img src="/src/assets/code-mackup.png" className="mt-10 lg:p-6" alt="" />
    </Home>
  );
};
