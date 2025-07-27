import { Eye, BookOpen, Mail, Lock, LogIn, EyeOff, Users, Shield } from 'lucide-react';
import { UseAuth } from "../context/UseAuth.ts";
import { useState } from "react";
import { loginUser } from "../services/authService.ts";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { login: authenticate } = UseAuth();

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const loginUserDetail = {
                    email: formData.email,
                    password: formData.password,
                };

                const loginResponse = await loginUser(loginUserDetail);

                toast.success("Login successful!");
                authenticate(loginResponse.accessToken);
                navigate("/dashboard");

            } catch (error: Error | unknown) {
                const message = error instanceof Error ? error.message : "Login failed. Please try again.";
                toast.error(message, {
                    duration: 5000,
                    position: "bottom-center",
                });
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    function togglePasswordVisibility() {
        setShowPassword(prev => !prev);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
            {/* ✅ Toaster with custom z-index */}
            <Toaster
                toastOptions={{
                    style: {
                        zIndex: 9999,
                    },
                }}
            />

            {/* Decorative background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-full mb-6 shadow-2xl">
                        <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                        Literary Haven
                    </h1>
                    <p className="text-gray-700 text-lg font-medium">Discover your next great adventure</p>
                </div>

                {/* Login form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30 hover:shadow-3xl transition-all duration-300"
                >
                    <div className="space-y-6">
                        {/* Email */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-teal-500 transition-colors" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                                    placeholder="john.doe@bookclub.lk"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-teal-500 transition-colors" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-gray-50 focus:bg-white hover:border-gray-300"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">!</span>
                                        {errors.password}
                                    </p>
                                )}
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember me + Forgot password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded transition-all"
                                />
                                <label htmlFor="remember" className="ml-3 block text-sm text-gray-700 font-medium">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-teal-600 hover:text-teal-800 font-semibold transition-colors hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 focus:ring-4 focus:ring-teal-300 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center transform hover:scale-105"
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            Enter Your Literary World
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <a
                                href="/signup"
                                className="font-semibold text-teal-600 hover:text-teal-800 focus:outline-none hover:underline transition-all duration-200"
                            >
                                Create new account
                            </a>
                        </p>
                    </div>
                </form>

                {/* Help and security cards */}
                <div className="mt-8 grid grid-cols-1 gap-4">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                        <div className="flex items-start space-x-3">
                            <Users className="w-6 h-6 text-teal-600" />
                            <div>
                                <h3 className="text-sm font-semibold text-teal-900 mb-2">Need Help?</h3>
                                <p className="text-xs text-teal-700 mb-2">Contact your system administrator or IT support for account assistance.</p>
                                <p className="text-xs text-teal-600">📧 support@literaryhaven.lk</p>
                                <p className="text-xs text-teal-600">📞 +94 11 123 4567</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                            <Shield className="w-4 h-4" />
                            <span>Secure access for authorized library staff only</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
