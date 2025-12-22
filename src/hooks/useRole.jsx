import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${API_URL}/user/role/${user.email}`)
        .then((res) => setRole(res.data))
        .catch((err) => console.error("Error fetching role:", err));
    }
  }, [user]);

  return { role };
};

export default useRole;
