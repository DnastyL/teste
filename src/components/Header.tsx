import { X, List } from "phosphor-react";
import { Logo } from "./Logo";
import { useContextValues } from "../hooks/useContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const Header = () => {
  const { timeline, setTimeline } = useContextValues();
  const { subscriber } = useParams<{ subscriber: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="w-full p-5 flex items-center justify-center bg-gray-700 border-b border-gray-600 sm:justify-between sml:flex-col sml:items-start">
      <div
        className="hover:cursor-pointer"
        onClick={() =>
          location.pathname == `/event/${subscriber}`
            ? navigate("/")
            : navigate("/event")
        }
      >
        <Logo />
      </div>

      <div
        className="hidden items-center sm:flex hover:cursor-pointer"
        onClick={() => setTimeline(!timeline)}
      >
        {!timeline ? <List size={24} /> : <X size={24} />}
      </div>
    </header>
  );
};
