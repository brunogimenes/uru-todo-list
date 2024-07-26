import { Outlet } from "react-router-dom";
import { ListsProvider } from "../lists/state/lists.provider";

const HomePage = () => {
  return (
    <div>
      <ListsProvider>

        <Outlet />
      </ListsProvider>
    </div>
  );
}

export default HomePage;