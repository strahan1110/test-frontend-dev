import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authentication";
import { toast } from "react-toastify";



const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await login(username, password);
        navigate('/modulos', { replace: true });
      } catch (error) {
        toast.error(error.message);
      }
    };

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
    
}
export default Login;