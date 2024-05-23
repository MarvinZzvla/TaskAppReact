import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-zinc-700 flex justify-between px-10 py-2">
      <Link to="/">
        <h1 className="text-white font-bold">React navigation</h1>
      </Link>

      <ul className="flex">
        <li>
          <Link to="/" className="text-white m-2">
            Home
          </Link>
        </li>
        <li>
          <Link to="/new" className="text-white m-2">
            Create task
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
