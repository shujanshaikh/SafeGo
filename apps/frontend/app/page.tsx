"use client"
import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Cloud, 
  Users,
  Menu,
  X,
  MessageCircle,
  Send
} from 'lucide-react';
import MapWithDirections from '@/components/map';
import WeatherInfo from '@/components/WeatherInfo';
import { BACKEND_URL } from '@/config';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [crimeRateData, setCrimeRateData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  const handleStartNavigation = () => {
    setIsNavigating(true);
  };

  const handleRouteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching route from', startLocation, 'to', endLocation);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim() || isChatLoading) return;

    const userMessage = currentMessage.trim();
    setCurrentMessage('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="min-h-screen bg-teal-50 relative">
      {/* Navigation */}
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
              <a href="#" className="px-3 py-2 rounded-md hover:bg-emerald-500">Recent Reports</a>
              {token ? (
                <button
                  onClick={() => {
                    setToken(null);
                    localStorage.removeItem('token');
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsSignInOpen(true)}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUpOpen(true)}
                    className="px-4 py-2 border border-emerald-500 text-emerald-500 rounded-md hover:bg-emerald-50 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
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
              {token ? (
                <button
                  onClick={() => {
                    setToken(null);
                    localStorage.removeItem('token');
                  }}
                  className="w-full px-3 py-2 mt-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-left"
                >
                  Sign Out
                </button>
              ) : (
                <div className="space-y-1 mt-2">
                  <button
                    onClick={() => setIsSignInOpen(true)}
                    className="w-full px-3 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors text-left"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUpOpen(true)}
                    className="w-full px-3 py-2 border border-emerald-500 text-emerald-500 rounded-md hover:bg-emerald-50 transition-colors text-left"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {isNavigating ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold mb-4">Plan Your Route</h2>
            <form onSubmit={handleRouteSearch} className="space-y-4">
              <div>
                <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Location</label>
                <input
                  type="text"
                  id="start"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter start location"
                  required
                />
              </div>
              <div>
                <label htmlFor="end" className="block text-sm font-medium text-gray-700">End Location</label>
                <input
                  type="text"
                  id="end"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter destination"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsNavigating(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-500"
                >
                  Find Route
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Map Preview */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="aspect-w-16 aspect-h-9 mb-4">
               <MapWithDirections 
                 origin={startLocation}
                 destination={endLocation}
                 setOrigin={setStartLocation}
                 setDestination={setEndLocation}
                 onRouteStart={async (origin, destination) => {
                   setIsLoading(true);
                   setCrimeRateData(null);
                   try {
                     const response = await fetch(`${BACKEND_URL}/crimerate`, {
                       method: 'POST',
                       headers: { 
                         'Content-Type': 'application/json',
                       },
                       body: JSON.stringify({
                         locationA: origin,
                         locationB: destination,
                       }),
                     });
                     const data = await response.json();
                     setCrimeRateData(data.summary);
                   } catch (error) {
                     console.error('Error fetching crime rate:', error);
                     setCrimeRateData('Error fetching safety information');
                   } finally {
                     setIsLoading(false);
                   }
                 }}
               />
              </div>
              <div className="flex justify-center">
                
              </div>
            </div>

            {/* Current Red Spots */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-emerald-600 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-emerald-500" />
                Safety Analysis
              </h3> 
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-gray-600">Analyzing route safety...</p>
                </div>
              ) : crimeRateData ? (
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-gray-800 whitespace-pre-line">{crimeRateData}</p>
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Select a route to view safety analysis
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-500 transition-colors z-50"
      >
        {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chatbot Interface */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200 bg-emerald-600 text-white rounded-t-lg">
            <h3 className="text-lg font-semibold">SafeGo Assistant</h3>
            <p className="text-sm opacity-90">Ask me anything about safety and navigation</p>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!currentMessage.trim() || isChatLoading}
                className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;