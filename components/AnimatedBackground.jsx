'use client';
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Very subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Pastel orbs */}
      <div className="orb w-[650px] h-[650px] animate-float-slow"
           style={{ background:'rgba(99,102,241,0.12)', top:'-180px', left:'-150px' }} />
      <div className="orb w-[550px] h-[550px] animate-float-medium"
           style={{ background:'rgba(139,92,246,0.09)', top:'30%', right:'-120px' }} />
      <div className="orb w-[480px] h-[480px] animate-float-fast"
           style={{ background:'rgba(6,182,212,0.08)', bottom:'10%', left:'20%' }} />
      <div className="orb w-[380px] h-[380px] animate-float-slow"
           style={{ background:'rgba(236,72,153,0.06)', bottom:'-80px', right:'25%', animationDelay:'-7s' }} />
    </div>
  );
}
