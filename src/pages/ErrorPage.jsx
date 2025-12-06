import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          
          {/* Animated 404 */}
          <div className="relative mb-8">
            <div className="text-9xl font-bold text-primary animate-pulse">
              404
            </div>
            <div className="absolute -top-2 -right-2 text-4xl">😕</div>
            <div className="absolute -bottom-2 -left-2 text-4xl">🤔</div>
          </div>
          
          {/* Message */}
          <h1 className="text-5xl font-bold mb-4">Lost in Style?</h1>
          <p className="py-6 text-lg">
            Looks like the page you're looking for decided to redecorate somewhere else. 
            Don't worry, even the best designs sometimes get rearranged!
          </p>
          
          {/* Decorative Elements */}
          <div className="flex justify-center gap-4 my-8">
            {['🛋️', '🎨', '🖼️', '💡', '🌿'].map((emoji, i) => (
              <div 
                key={i} 
                className="text-3xl animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-primary btn-lg gap-2">
              🏡 Return Home
            </Link>
            <Link to="/services" className="btn btn-secondary btn-lg gap-2">
              🎨 Browse Services
            </Link>
          </div>
          

          {/* Fun Fact */}
          <div className="mt-8 p-4 bg-base-300 rounded-lg">
            <p className="text-sm">
              <span className="font-bold">Fun Fact:</span> This error page was designed 
              with the same care as our interior designs! 🎨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;