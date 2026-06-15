import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>404</h1>
      <p>Page nahi mila bhai</p>
      <button onClick={() => navigate("/")}>Home jao</button>
    </div>
  );
};

export default NotFound;