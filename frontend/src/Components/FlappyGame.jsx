"use client"

import { useState, useEffect, useRef } from "react"

const FlappyGame = ({ onBack }) => {
  const canvasRef = useRef(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const gameStateRef = useRef({
    bird: { x: 50, y: 250, velocity: 0, radius: 15 },
    pipes: [],
    score: 0,
    frame: 0,
  })

  useEffect(() => {
    const savedHighScore = localStorage.getItem("flappyHighScore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const GRAVITY = 0.5
    const JUMP_STRENGTH = -8
    const PIPE_WIDTH = 60
    const PIPE_GAP = 150
    const PIPE_SPEED = 3

    let animationId

    const resetGame = () => {
      gameStateRef.current = {
        bird: { x: 50, y: 250, velocity: 0, radius: 15 },
        pipes: [
          { x: 400, topHeight: 150 },
          { x: 650, topHeight: 200 },
          { x: 900, topHeight: 100 },
        ],
        score: 0,
        frame: 0,
      }
      setScore(0)
    }

    const drawBird = () => {
      const { bird } = gameStateRef.current
      ctx.fillStyle = "#FFD700"
      ctx.beginPath()
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2)
      ctx.fill()

      // Eye
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(bird.x + 5, bird.y - 3, 3, 0, Math.PI * 2)
      ctx.fill()

      // Beak
      ctx.fillStyle = "#FF6B35"
      ctx.beginPath()
      ctx.moveTo(bird.x + bird.radius, bird.y)
      ctx.lineTo(bird.x + bird.radius + 8, bird.y - 3)
      ctx.lineTo(bird.x + bird.radius + 8, bird.y + 3)
      ctx.closePath()
      ctx.fill()
    }

    const drawPipes = () => {
      const { pipes } = gameStateRef.current

      pipes.forEach((pipe) => {
        // Top pipe
        ctx.fillStyle = "#4ADE80"
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight)
        ctx.strokeStyle = "#22C55E"
        ctx.lineWidth = 3
        ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight)

        // Bottom pipe
        const bottomY = pipe.topHeight + PIPE_GAP
        ctx.fillStyle = "#4ADE80"
        ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, canvas.height - bottomY)
        ctx.strokeStyle = "#22C55E"
        ctx.strokeRect(pipe.x, bottomY, PIPE_WIDTH, canvas.height - bottomY)

        // Pipe caps
        ctx.fillStyle = "#22C55E"
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, PIPE_WIDTH + 10, 20)
        ctx.fillRect(pipe.x - 5, bottomY, PIPE_WIDTH + 10, 20)
      })
    }

    const updateBird = () => {
      const { bird } = gameStateRef.current
      bird.velocity += GRAVITY
      bird.y += bird.velocity

      // Check boundaries
      if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
        endGame()
      }
    }

    const updatePipes = () => {
      const { pipes, bird } = gameStateRef.current

      pipes.forEach((pipe, index) => {
        pipe.x -= PIPE_SPEED

        // Check collision
        if (
          bird.x + bird.radius > pipe.x &&
          bird.x - bird.radius < pipe.x + PIPE_WIDTH &&
          (bird.y - bird.radius < pipe.topHeight || bird.y + bird.radius > pipe.topHeight + PIPE_GAP)
        ) {
          endGame()
        }

        // Score when passing pipe
        if (pipe.x + PIPE_WIDTH < bird.x && !pipe.scored) {
          pipe.scored = true
          gameStateRef.current.score++
          setScore(gameStateRef.current.score)
        }

        // Remove off-screen pipes and add new ones
        if (pipe.x + PIPE_WIDTH < 0) {
          pipes.splice(index, 1)
          const lastPipe = pipes[pipes.length - 1]
          pipes.push({
            x: lastPipe.x + 250,
            topHeight: Math.random() * (canvas.height - PIPE_GAP - 100) + 50,
            scored: false,
          })
        }
      })
    }

    const endGame = () => {
      setGameOver(true)
      const currentScore = gameStateRef.current.score
      if (currentScore > highScore) {
        setHighScore(currentScore)
        localStorage.setItem("flappyHighScore", currentScore.toString())
      }
    }

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0F172A")
      gradient.addColorStop(1, "#1E3A8A")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      updateBird()
      updatePipes()
      drawPipes()
      drawBird()

      gameStateRef.current.frame++
      animationId = requestAnimationFrame(gameLoop)
    }

    const handleJump = (e) => {
      if (e.code === "Space" || e.type === "click" || e.type === "touchstart") {
        e.preventDefault()
        gameStateRef.current.bird.velocity = JUMP_STRENGTH
      }
    }

    resetGame()
    gameLoop()

    window.addEventListener("keydown", handleJump)
    canvas.addEventListener("click", handleJump)
    canvas.addEventListener("touchstart", handleJump)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("keydown", handleJump)
      canvas.removeEventListener("click", handleJump)
      canvas.removeEventListener("touchstart", handleJump)
    }
  }, [gameStarted, gameOver, highScore])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
  }

  const restartGame = () => {
    setGameOver(false)
    setScore(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white">
              <div className="text-sm opacity-75">Score</div>
              <div className="text-3xl font-bold">{score}</div>
            </div>
            <div className="text-white text-right">
              <div className="text-sm opacity-75">High Score</div>
              <div className="text-3xl font-bold text-yellow-400">{highScore}</div>
            </div>
          </div>

          <div className="relative">
            <canvas ref={canvasRef} width={600} height={500} className="w-full border-4 border-white/20 rounded-lg" />

            {!gameStarted && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <div className="text-center">
                  <h2 className="text-white text-3xl font-bold mb-4">Flappy Bird</h2>
                  <p className="text-white/75 mb-6">Click or press Space to fly</p>
                  <button
                    onClick={startGame}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Start Game
                  </button>
                </div>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <div className="text-center">
                  <h2 className="text-white text-3xl font-bold mb-2">Game Over!</h2>
                  <p className="text-white text-xl mb-6">Score: {score}</p>
                  <button
                    onClick={restartGame}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-center text-white/75 text-sm">
            Click anywhere or press Space to make the bird fly
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlappyGame
