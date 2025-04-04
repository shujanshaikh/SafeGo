"use client"
import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";

export default function Navbar(){
     const [isMenuOpen, setIsMenuOpen] = useState(false);
    return(
        <nav className="bg-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8" />
              <span className="ml-2 text-xl font-bold">SafeGo</span>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-emerald-500"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="px-3 py-2 rounded-md hover:bg-emerald-500">Dashboard</a>
              <a href="#" className="px-3 py-2 rounded-md hover:bg-emerald-500">Safety tips</a>
              <a href="#" className="px-3 py-2 rounded-md hover:bg-emerald-500">Alerts</a>
              <a href="#" className="px-3 py-2 rounded-md hover:bg-emerald-500"> Recent Reports</a>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-emerald-500">Dashboard</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-emerald-500">Safety tips</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-emerald-500">Alerts</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-emerald-500">Recent Reports</a>
            </div>
          </div>
        )}
      </nav>
    )
}