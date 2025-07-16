import { Link } from "react-router-dom";
import "../styles/notfound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">Go back to login</Link>
    </div>
  );
}
