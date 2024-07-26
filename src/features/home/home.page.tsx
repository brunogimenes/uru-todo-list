import { Outlet } from "react-router-dom";
import { ListsProvider } from "../lists/state/lists.provider";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl">☑️ Uru Todo List</h1>
      <hr className="my-10" />
      <ListsProvider>
        <Outlet />
      </ListsProvider>
    </div>
  );
}

export default HomePage;