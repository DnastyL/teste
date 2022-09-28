import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";
import { useContextValues } from "../hooks/useContext";
import { Home } from "./Home";

export const Subscribe = () => {
  const { setUser } = useContextValues();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    try{
      await createSubscriber({
      variables: {
        name,
        email,
      },
    });
    setUser(true);
    navigate("/event");
  }catch(error){
    throw new Error (`Error on createSubscriber ${error} `);
  }
  }

  return (
    <Home>
      <div className=" w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto lg:flex-col lg:max-w-full lg:gap-3 ">
        <div className="max-w-[640px] sm:max-w-[330px] sm:flex sm:flex-col sm:items-center">
          <Logo />
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
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl m-6 block">
            Inscreva-se gratuitamente
          </strong>
          <div className="flex flex-col gap-2">
            <Form
              name={name}
              email={email}
              setName={setName}
              setEmail={setEmail}
              handleSubscribe={handleSubscribe}
            >
              <Button type="submit" disabled={loading || !name || !email}>
                Garantir sua Vaga
              </Button>
            </Form>
            <span
              onClick={() => {
                navigate("/instructor");
              }}
            >
              <a className="text-base hover:text-green-500 hover:cursor-pointer border-b-[1px] hover:border-green-500">
                Entrar como Instrutor
              </a>
            </span>
          </div>
        </div>
      </div>
      <img src="/src/assets/code-mackup.png" className="mt-10 lg:p-6" alt="" />
    </Home>
  );
};
