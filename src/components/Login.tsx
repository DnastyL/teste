import classNames from "classnames";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetSubscriberQuery,
  useGetTeacherQuery,
} from "../graphql/generated";
import { useContextValues } from "../hooks/useContext";
import { Button } from "./Button";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(true);
  const [isSub, setIsSub] = useState(true);
  const {
    handleSubmitUserInSessionStorage
  } = useContextValues();
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useGetTeacherQuery({
    variables: {
      email: email.trim(),
      password: password.trim(),
    },
  });
  const { data: dataSubscriber } = useGetSubscriberQuery({
    variables: {
      email: email.trim(),
      password: password.trim(),
    },
  });


  async function handleTeacherLogin(event: FormEvent) {
    event.preventDefault();

    if (data && data.teachers.length > 0) {
      data.teachers.map((teacher) => {
        const isSubscriber = false;
        handleSubmitUserInSessionStorage(
          teacher.name,
          email,
          teacher.slug!,
          isSubscriber
        );
        return navigate(`/instructor/event/${teacher.slug}`);
      });
    }else{
     return setIsTeacher(false);
    } 
  }

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if (dataSubscriber && dataSubscriber.subscribers.length > 0) {
      dataSubscriber.subscribers.map((subscriber) => {
        const isSubscriber = true;
        handleSubmitUserInSessionStorage(
          subscriber.name,
          email,
          subscriber.slug!,
          isSubscriber
        );
        return navigate(`/event/${subscriber.slug}`);
      });
    }
    else{
      return setIsSub(false);
    }
  }
  

  return (
    <div className="p-8 bg-gray-700 border border-gray-500 rounded">
      <strong className="text-2xl m-6 block">Faça seu Login</strong>
      <div className="flex flex-col gap-2">
        <form
          name="login"
          onSubmit={location.pathname === "/instructor/login" ? handleTeacherLogin : handleLogin}
          className="flex flex-col gap-2 w-full"
          autoComplete="off"
        >
          <div className="relative">
            <input
              type="email"
              className="peer"
              autoComplete="off"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className={classNames(
                "absolute bg-gray-700 rounded top-4 px-1 left-5 cursor-text  peer-focus:text-xs peer-focus:text-blue-500 peer-focus:-top-2 transition-all",
                { "-top-2 text-xs transition-all": email }
              )}
            >
              Digite seu email
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              className="peer"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className={classNames(
                "absolute bg-gray-700 rounded top-4 px-1 left-5 cursor-text  peer-focus:text-xs peer-focus:text-blue-500 peer-focus:-top-2 transition-all",
                { "-top-2 text-xs transition-all": password }
              )}
            >
              Digite sua senha
            </label>
          </div>
          <Button
            type="submit"
            disabled={!email || !password || !data?.teachers || !dataSubscriber?.subscribers}
          >
            Login
          </Button>
        </form>
      </div>
      {!isTeacher || !isSub  ? (
        <p className="text-base text-red-900 mt-3">Email ou Senha Incorretos</p>
      ): ''}
    </div>
  );
};
