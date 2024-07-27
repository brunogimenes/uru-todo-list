import { ListsProvider } from "features/lists/state/lists.provider";
import { Outlet } from "react-router-dom";


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