import classNames from "classnames";
import { FormEvent,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTeacherQuery } from "../graphql/generated";
import { useContextValues } from "../hooks/useContext";
import { Button } from "./Button";

export const LoginTeacher = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(true);
  const { setTeacher, sessionStorageTeacher, setSessionStorageTeacher } =
    useContextValues();
  const navigate = useNavigate();

  const { data } = useGetTeacherQuery({
    variables: {
      email: email.trim(),
      password: password.trim(),
    },
  });
  console.log(data);

  async function handleTeacherLogin(event: FormEvent) {
    event.preventDefault();
    if (data && data.teachers.length > 0) {
      data.teachers.map((teacher) => {
        handleSubmitTeacherInSessionStorage(teacher.name, email, teacher.slug!);
        return navigate(`/instructor/event/${teacher.slug}`);
      });
    } else {
      return setIsTeacher(false);
    }
  }

  function handleSubmitTeacherInSessionStorage(
    name: string,
    email: string,
    slug: string
  ) {
    const teacherObject = {
      name: name,
      email: email,
      slug: slug,
    };
    setSessionStorageTeacher(teacherObject);
    sessionStorage.setItem("teacher", JSON.stringify(teacherObject));
    setTeacher(true);
  }

  console.log(email, password);

  return (
    <div className="p-8 bg-gray-700 border border-gray-500 rounded">
      <strong className="text-2xl m-6 block">Login Do Professor</strong>
      <div className="flex flex-col gap-2">
        <form
          name="login"
          onSubmit={handleTeacherLogin}
          className="flex flex-col gap-2 w-full"
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
            disabled={!email || !password || !data?.teachers}
          >
            Login
          </Button>
        </form>
      </div>
      {!isTeacher && (
        <p className="text-base text-red-900 mt-3">Email ou Senha Incorretos</p>
      )}
    </div>
  );
};
