import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "../../components/core/buttons"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginData, loginAction } from "../../store/features/auth/authAction";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAction(formData).then((res) => {
        localStorage.setItem("token", res.data);
        navigate("/dashboard")
      });
    } catch (error: any) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative">
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 absolute left-3 top-3" />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none"
                placeholder="Your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <FontAwesomeIcon icon={faLock} className="text-gray-400 absolute left-3 top-3" />
            </div>
          </div>
          <PrimaryButton text="Login" fullWidth={true} textCenter={true} onClick={() => handleLogin} />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
