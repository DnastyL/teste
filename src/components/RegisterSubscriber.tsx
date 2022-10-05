import classNames from "classnames";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSubscriberMutation } from "../graphql/generated";
import { useContextValues } from "../hooks/useContext";
import { Button } from "./Button";
import { Form } from "./Form";

export type TypeSubscribeValues = {
  name: string;
  email: string;
  password: string;
  slug: string;
};

export const RegisterSubscriber = () => {
  const navigate = useNavigate();
  const { handleSubmitUserInSessionStorage } = useContextValues();

  const [subscribeValues, setSubscribeValues] = useState<TypeSubscribeValues>(
    {} as TypeSubscribeValues
  );

  const [createSubscriber, { loading, error }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    try {
      await createSubscriber({
        variables: {
          name: subscribeValues.name,
          email: subscribeValues.email.trim(),
          password: subscribeValues.password.trim(),
          slug: subscribeValues.slug,
        },
      }).then(() => {
        const isSubscriber = true;
        handleSubmitUserInSessionStorage(
          subscribeValues.name,
          subscribeValues.email.trim(),
          subscribeValues.slug,
          isSubscriber
        );
        return navigate(`/event/${subscribeValues.slug}`);
      });
    } catch (error) {
      console.log(error)
      throw new Error(`Error on createSubscriber ${error} `);
    }
  }


 
  return (
    <div className="p-8 bg-gray-700 border border-gray-500 rounded">
      <strong className="text-2xl m-6 block">Inscreva-se gratuitamente</strong>
      <div className="flex flex-col gap-3">
        <Form
          subscribeValues={subscribeValues}
          setSubscribeValues={setSubscribeValues}
          handleSubscribe={handleSubscribe}
        >
          <div className="relative">
            <input
              className="peer"
              placeholder=""
              id="password"
              name="password"
              type="password"
              onChange={(event) => {
                setSubscribeValues({
                  ...subscribeValues,
                  [event.target.name]: event.target.value,
                });
              }}
            />
            <label
              htmlFor="password"
              className={classNames(
                "absolute bg-gray-700 rounded top-4 px-1 left-5 cursor-text  peer-focus:text-xs peer-focus:text-blue-500 peer-focus:-top-2 transition-all",
                {
                  "-top-2 text-xs transition-all": subscribeValues.password,
                }
              )}
            >
              Crie sua senha
            </label>
          </div>
          <Button
            type="submit"
            disabled={
              loading || !subscribeValues.name || !subscribeValues.email || !subscribeValues.password
            }
          >
            Garantir sua Vaga
          </Button>
        </Form>
        <div className="flex justify-between">
          <span
            onClick={() => {
              navigate("/instructor");
            }}
          >
            <a className="text-sm font-semibold hover:text-green-500 hover:cursor-pointer hover:border-green-500">
              Entrar como Instrutor
            </a>
          </span>
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            <a className="text-sm font-semibold hover:text-green-500 hover:cursor-pointer hover:border-green-500">
              Faça seu Login
            </a>
          </span>
        </div>
        {error && (
          <span className="text-sm font-semibold text-red-900">
              User already exists
          </span>
        )}
      </div>
    </div>
  );
};
