import { jwtDecode } from "jwt-decode";

const getCurrentUserId = () => {
    const token = localStorage.getItem("login");
    const decodedToken = jwtDecode(token);

    const id = decodedToken.nameid;

    return id;
}

export default getCurrentUserId;