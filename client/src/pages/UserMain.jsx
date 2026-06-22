import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import TrustAndProcess from './Trustandprocess'
import FeaturedCampaigns from './Featuredcampaigns'
import WhyBlockchain from './Whyblockchain'
import Footer from './Footer'


const UserMain = () => {
  return (
    <div className="relative min-h-screen bg-dark overflow-hidden">

      {/* ── Animated Grid ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">

        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite',
          }}
        />

        {/* Fade edges so grid doesnt look harsh */}
        <div className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, rgb(var(--color-dark, 8 8 20)) 100%)
            `
          }}
        />

        {/* Glow orb 1 - top left */}
        <div
          className="absolute rounded-full"
          style={{
            width: '600px', height: '600px',
            top: '-150px', left: '-100px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'pulse1 8s ease-in-out infinite',
          }}
        />

        {/* Glow orb 2 - top right */}
        <div
          className="absolute rounded-full"
          style={{
            width: '500px', height: '500px',
            top: '-80px', right: '-80px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'pulse2 10s ease-in-out infinite',
          }}
        />

        {/* Glow orb 3 - bottom center */}
        <div
          className="absolute rounded-full"
          style={{
            width: '400px', height: '400px',
            bottom: '10%', left: '40%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            filter: 'blur(45px)',
            animation: 'pulse3 12s ease-in-out infinite',
          }}
        />

        {/* Shimmer dots at grid intersections */}
        {[
          { top: '15%', left: '20%', delay: '0s' },
          { top: '30%', left: '60%', delay: '1.5s' },
          { top: '55%', left: '35%', delay: '3s' },
          { top: '70%', left: '75%', delay: '0.8s' },
          { top: '20%', left: '80%', delay: '2.2s' },
          { top: '45%', left: '10%', delay: '4s' },
          { top: '80%', left: '50%', delay: '1s' },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '3px', height: '3px',
              top: dot.top, left: dot.left,
              background: 'rgba(99,102,241,0.8)',
              boxShadow: '0 0 6px rgba(99,102,241,0.6)',
              animation: `shimmerDot 4s ease-in-out infinite`,
              animationDelay: dot.delay,
            }}
          />
        ))}

      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes gridMove {
          0%   { background-position: 0 0, 0 0; }
          100% { background-position: 60px 60px, 60px 60px; }
        }
        @keyframes pulse1 {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.15); }
        }
        @keyframes pulse2 {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.9; transform: scale(1.2); }
        }
        @keyframes pulse3 {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes shimmerDot {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50%       { opacity: 1; transform: scale(1.5); }
        }
      `}</style>

      {/* ── Content ── */}
      <div className="relative z-10">
     
        <Hero />
       <TrustAndProcess/> 
     <FeaturedCampaigns/>
     <WhyBlockchain/>
     <Footer/>
      </div>

    </div>
  )
}

export default UserMain