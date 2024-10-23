import React from 'react';
import Landing from '@/pages/Landing';

function App() {
  return (
    <>
      <Landing />
      <footer className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4">
        <div className="max-w-4xl p-10 mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Heirloom. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
