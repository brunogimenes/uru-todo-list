
import { Outlet } from "react-router-dom";
const HomePage = () => {
  return (
    <div role="region">
      <Outlet />
    </div>
  );
}

export default HomePage;