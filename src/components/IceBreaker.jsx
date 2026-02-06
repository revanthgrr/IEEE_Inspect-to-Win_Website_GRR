import { useState } from "react";
import bearImage from "../assets/bear.jpg";

export default function IceBreaker({ onComplete }) {
    const [isZoomed, setIsZoomed] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'
    const [showResult, setShowResult] = useState(false);
    const [isFading, setIsFading] = useState(false); // For transition out

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const answer = inputValue.toLowerCase().trim();
        const isCorrect = answer === "bear" || answer === "brown bear" || answer === "black bear";

        setFeedback(isCorrect ? "correct" : "wrong");
        setIsZoomed(false); // Zoom out
        setShowResult(true);
    };

    const handleContinue = () => {
        setIsFading(true);
        setTimeout(() => {
            onComplete();
        }, 500); // Wait for fade out animation
    };

    return (
        <div className={`ice-breaker-overlay ${isFading ? "fade-out" : ""}`}>
            <div className="ice-breaker-card">

                {/* Header Section */}
                <div className="header">
                    <h2 className="title">Take a Breath</h2>
                    <div className="timer-badge">
                        <span className="icon">⏸</span>
                        <span>Don't worry, timer is paused</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="content-wrapper">
                    {/* Image Container */}
                    <div className={`image-frame ${isZoomed ? "zoomed" : ""}`}>
                        <img
                            src={bearImage}
                            alt="Mystery Animal"
                            className="mystery-image"
                        />
                        {isZoomed && <div className="magnifier-hint">🔍 Zoomed In</div>}
                    </div>

                    {/* Interaction Section */}
                    <div className="interaction-area">
                        {!showResult ? (
                            <div className="input-phase">
                                <p className="instruction">Identify the animal in the picture.</p>
                                <form onSubmit={handleSubmit} className="guess-form">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type your guess..."
                                        autoFocus
                                        className="guess-input"
                                    />
                                    <button type="submit" className="action-btn reveal-btn">
                                        Reveal Answer
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="result-phase">
                                <h3 className={`result-title ${feedback}`}>
                                    {feedback === "correct" ? "Spot on!" : "Nice try!"}
                                </h3>
                                <p className="answer-text">
                                    It is a <span className="highlight">Bear</span>.
                                </p>
                                <button onClick={handleContinue} className="action-btn continue-btn">
                                    Continue Game
                                </button>
                            </div>
                        )}
                        <button onClick={onComplete} className="skip-btn">
                            Skip
                        </button>
                    </div>
                </div>
            </div>

            <style jsx="true">{`
        .ice-breaker-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            font-family: 'Outfit', sans-serif;
            animation: floatIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .ice-breaker-overlay.fade-out {
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .ice-breaker-card {
            width: 90%;
            max-width: 800px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 32px;
            box-shadow: 
                0 20px 50px rgba(142, 197, 252, 0.25),
                0 0 0 4px rgba(255, 255, 255, 0.5) inset;
            overflow: hidden;
            padding: 3rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }

        .header {
            text-align: center;
            margin-bottom: 2.5rem;
            width: 100%;
        }

        .title {
            font-size: 2.8rem;
            font-weight: 800;
            background: linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0 0 1rem 0;
            letter-spacing: -0.5px;
        }

        .timer-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1.2rem;
            background: linear-gradient(90deg, #d299c2 0%, #fef9d7 100%);
            color: #555;
            border-radius: 100px;
            font-weight: 600;
            font-size: 0.95rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .content-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2.5rem;
            width: 100%;
        }

        /* Landscape layout */
        @media (min-width: 768px) {
            .content-wrapper {
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
            .image-frame {
                margin: 0;
            }
            .interaction-area {
                flex: 1;
                max-width: 350px;
                text-align: left;
                align-items: flex-start;
            }
            .guess-input {
                text-align: left;
            }
            .header {
                margin-bottom: 3rem;
            }
        }

        .image-frame {
            width: 280px;
            height: 280px;
            border-radius: 20%; 
            overflow: hidden;
            position: relative;
            box-shadow: 
                0 20px 40px rgba(100, 100, 255, 0.15),
                0 0 0 8px #ffffff;
            flex-shrink: 0;
            transform: translateZ(0); 
            background: #fff;
        }

        .mystery-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .image-frame.zoomed .mystery-image {
            transform: scale(5) translate(5%, 5%); 
        }

        .magnifier-hint {
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.8);
            color: #333;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
            backdrop-filter: blur(4px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .interaction-area {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 350px;
        }

        .instruction {
            font-size: 1.1rem;
            color: #64748b;
            margin-bottom: 1.5rem;
            font-weight: 500;
        }

        .guess-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .guess-input {
            width: 100%;
            padding: 1rem 1.2rem;
            font-size: 1.1rem;
            border: 2px solid #e0e7ff;
            border-radius: 16px;
            background: #fdfbfb;
            transition: all 0.2s;
            color: #334155;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }

        .guess-input:focus {
            outline: none;
            border-color: #a78bfa;
            background: #fff;
            box-shadow: 
                0 0 0 4px rgba(167, 139, 250, 0.1),
                0 10px 20px rgba(167, 139, 250, 0.05);
        }

        .skip-btn {
            margin-top: 2rem;
            background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%); 
            border: none;
            border-radius: 12px;
            color: white;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            padding: 10px 24px;
            box-shadow: 0 4px 12px rgba(161, 140, 209, 0.3);
            transition: all 0.2s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .skip-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 18px rgba(161, 140, 209, 0.4);
            filter: brightness(1.05);
        }

        .action-btn {
            width: 100%;
            padding: 1rem;
            border: none;
            border-radius: 16px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .reveal-btn {
            background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
            color: white;
            box-shadow: 0 10px 20px rgba(161, 140, 209, 0.3);
        }

        .reveal-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgba(161, 140, 209, 0.4);
            filter: brightness(1.05);
        }

        .continue-btn {
            background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
            color: white;
            box-shadow: 0 10px 20px rgba(132, 250, 176, 0.3);
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .continue-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgba(132, 250, 176, 0.4);
            filter: brightness(1.05);
        }

        .result-phase {
            animation: slideUp 0.4s ease;
        }

        .result-title {
            font-size: 2rem;
            margin: 0 0 0.5rem 0;
            font-weight: 800;
        }

        .result-title.correct { 
            background: linear-gradient(to right, #11998e, #38ef7d);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .result-title.wrong { 
            background: linear-gradient(to right, #ff9966, #ff5e62);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .answer-text {
            font-size: 1.2rem;
            color: #475569;
            margin-bottom: 1.5rem;
        }

        .highlight {
            color: #1e293b;
            font-weight: 800;
            background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
            background-repeat: no-repeat;
            background-size: 100% 0.3em;
            background-position: 0 88%;
            padding-bottom: 2px;
        }

        @keyframes floatIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
            `}</style>
        </div>
    );
}
