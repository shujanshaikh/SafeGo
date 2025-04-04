"use client";
import { useState } from "react";
import axios from "axios";
import router from "next/router";
import { BACKEND_URL } from "@/config";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const signup = async () => {
    const input : { email: string, password: string } = { email, password };
 await axios.post(`${BACKEND_URL}/signup`, input).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signup();
        router.push('/auth/signin');
    }
    return <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold mb-2">Sign In</h2>
                <p className="text-gray-500">Enter your credentials to sign in</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" className="mt-1 p-2 border rounded w-full" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" className="mt-1 p-2 border rounded w-full" required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
            </form>
        </div>
    </div>
}