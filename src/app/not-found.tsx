"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

export default function NotFound() {
  const [gamekv, setGameKv] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const scoreRef = useRef(0);

  // Game Constants
  const GRAVITY = 0.5;
  const JUMP_STRENGTH = -8;
  const PIPE_SPEED = 3;
  const PIPE_SPAWN_RATE = 100; // frames
  const GAP_SIZE = 180;
  const BIRD_SIZE = 20;

  // Game State Refs (for loop performance)
  const birdY = useRef(300);
  const birdVelocity = useRef(0);
  const pipes = useRef<{ x: number; topHeight: number; passed: boolean }[]>([]);
  const frameCount = useRef(0);

  const resetGame = () => {
    birdY.current = 300;
    birdVelocity.current = 0;
    pipes.current = [];
    frameCount.current = 0;
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
  };

  const startGame = () => {
    setGameKv(true);
    resetGame();
  };

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // Draw Bird (Cyber Box)
    ctx.fillStyle = "#3b82f6"; // Blue-500
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#3b82f6";
    ctx.fillRect(50, birdY.current, BIRD_SIZE, BIRD_SIZE);
    
    // Draw Pipes
    ctx.fillStyle = "#22c55e"; // Green-500 (Matrix style)
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#22c55e";
    
    pipes.current.forEach((pipe) => {
      // Top Pipe
      ctx.fillRect(pipe.x, 0, 50, pipe.topHeight);
      // Bottom Pipe
      ctx.fillRect(pipe.x, pipe.topHeight + GAP_SIZE, 50, height - (pipe.topHeight + GAP_SIZE));
    });

    // Reset Shadow
    ctx.shadowBlur = 0;

    // Draw Ground Line
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height - 2);
    ctx.lineTo(width, height - 2);
    ctx.stroke();

  }, []);

  const update = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Physics
    birdVelocity.current += GRAVITY;
    birdY.current += birdVelocity.current;

    // Spawn Pipes
    frameCount.current++;
    if (frameCount.current % PIPE_SPAWN_RATE === 0) {
      const minHeight = 50;
      const maxHeight = height - GAP_SIZE - 50;
      const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      pipes.current.push({ x: width, topHeight: randomHeight, passed: false });
    }

    // Update Pipes & Collision
    for (let i = pipes.current.length - 1; i >= 0; i--) {
      const pipe = pipes.current[i];
      pipe.x -= PIPE_SPEED;

      // Remove off-screen pipes
      if (pipe.x + 50 < 0) {
        pipes.current.splice(i, 1);
        continue;
      }

      // Collision Detection
      const birdRect = { x: 50, y: birdY.current, w: BIRD_SIZE, h: BIRD_SIZE };
      const pipeTopRect = { x: pipe.x, y: 0, w: 50, h: pipe.topHeight };
      const pipeBottomRect = { x: pipe.x, y: pipe.topHeight + GAP_SIZE, w: 50, h: height };

      if (
        checkCollision(birdRect, pipeTopRect) ||
        checkCollision(birdRect, pipeBottomRect) ||
        birdY.current + BIRD_SIZE > height ||
        birdY.current < 0
      ) {
        setGameOver(true);
        return; // Stop Loop
      }

      // Score
      if (!pipe.passed && pipe.x + 50 < 50) {
        pipe.passed = true;
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }
    }

    draw(ctx, width, height);

    if (!gameOver) {
      requestRef.current = requestAnimationFrame(update);
    }
  }, [gameOver, draw]);

  const checkCollision = (rect1: any, rect2: any) => {
    return (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    );
  };

  const handleJump = useCallback(() => {
    if (gameOver) {
      resetGame();
      requestRef.current = requestAnimationFrame(update);
    } else {
      birdVelocity.current = JUMP_STRENGTH;
    }
  }, [gameOver, update]);

  // Key Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleJump]);

  // Game Loop
  useEffect(() => {
    if (gamekv && !gameOver) {
      requestRef.current = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gamekv, gameOver, update]);

  // High Score
  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-6 overflow-hidden relative touch-none">
      {/* Background Mesh */}
      <div className="mesh-bg opacity-50" />

      {!gamekv ? (
        <div className="relative z-10 animate-fade-in">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-black heading-font text-white mb-2 uppercase tracking-tighter">
              404 — <span className="gradient-text">Not Found</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-md mb-8 leading-relaxed font-medium">
              We can't find that page, but we have a fun game for you to play!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
               <button 
                onClick={startGame}
                className="px-8 py-3 bg-blue-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25"
              >
                Play Game
              </button>
              <Link 
                href="/" 
                className="px-8 py-3 bg-white/10 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/20 transition-all border border-white/10"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-2xl">
           {/* Score Board */}
           <div className="absolute top-4 left-0 right-0 flex justify-between px-6 font-mono text-white text-lg z-20 pointer-events-none">
              <span className="bg-black/50 px-3 py-1 rounded border border-white/10">SCORE: {score}</span>
              <span className="bg-black/50 px-3 py-1 rounded border border-white/10 text-yellow-400">HIGHSCORE: {highScore}</span>
           </div>

           {/* Game Over Screen */}
           {gameOver && (
             <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl">
               <h3 className="text-4xl font-black text-white mb-2">GAME OVER!</h3>
               <p className="text-slate-400 mb-6 font-medium">Nice try! Ready for another round?</p>
               <button 
                  onClick={handleJump}
                  className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl shadow-white/10"
                >
                  Play Again
                </button>
             </div>
           )}

           <canvas 
             ref={canvasRef}
             width={800}
             height={600}
             onClick={handleJump}
             className="w-full h-auto bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl shadow-blue-900/20 cursor-pointer"
           />
           <p className="mt-4 text-xs text-slate-500 font-mono">
             [SPACE] or [TAP] to Fly
           </p>
           
           <button 
             onClick={() => setGameKv(false)}
             className="absolute -top-12 right-0 text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
           >
             Exit Game
           </button>
        </div>
      )}
    </main>
  );
}