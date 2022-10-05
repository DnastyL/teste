import { useLocation, useNavigate } from "react-router-dom";
import { Login } from "../components/Login";
import { Logo } from "../components/Logo";
import { RegisterSubscriber } from "../components/RegisterSubscriber";
import { Home } from "./Home";
import { ArrowCircleLeft } from "phosphor-react";

export const Subscribe = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Home>
      <div className=" w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto lg:flex-col lg:max-w-full lg:gap-3 ">
        <div className="max-w-[640px] sm:max-w-[330px] sm:flex sm:flex-col sm:items-center">
          <div className="flex items-center">
            {location.pathname === "/login" && (
              <span
                className="hidden relative right-11 sm:flex hover:text-green-500 hover:cursor-pointer sml:right-3"
                onClick={() => navigate("/")}
              >
                <ArrowCircleLeft size={24} />
              </span>
            )}
            <Logo />
          </div>
          <h1 className="mt-8 text-[2.5rem] leading-tight sm:text-center sm:text-[2.2rem]">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa,</strong> do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed sm:text-center">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado{" "}
          </p>
        </div>
        {location.pathname === "/" ? <RegisterSubscriber /> : <Login />}
      </div>
      <img src="/src/assets/code-mackup.png" className="mt-10 lg:p-6" alt="" />
    </Home>
  );
};
