"use client";
import { useState, useEffect, useRef } from 'react';

export default function ChatbotPopup() {
    // Chatbot States
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [isPredefinedQuestion, setIsPredefinedQuestion] = useState(false);
    const [isQuestionAsked, setIsQuestionAsked] = useState(false);
    const isInitialRender = useRef(true);
    const [placeholderText, setPlaceholderText] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(50);
    const [botTypingText, setBotTypingText] = useState('');
    const [botTypingIndex, setBotTypingIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility

    const questions = [
        "What events are conducted by IEEE?",
        "Whom should I contact for Mr and Ms Pantheon?",
        "When is Bitotsav going to happen?",
        "What is the category of Dance Saga?",
    ];

    const predefinedQuestions = [
        "What are the events conducted by IEEE?",
        "What are the events conducted by EDC?",
        "What are the events conducted by SDS?",
        "What are the events conducted by ECESOC?",
        "What are the events by Literary Society?",
        "What are the Flagship Events?",
        "What are the events conducted by Dance Club?",
        "What are the events conducted by NAPS?",
        "What are the events conducted by Aero Society?",
        "What are the events conducted by 180DC?",
        "What are the events conducted by EEESOC?",
        "What are the events conducted by Srijan?",
        "What are the events conducted by LEO?",
        "What are the events conducted by IETE?",
        "What are the events conducted by Civil Engineering Society?",
        "What are the events conducted by Dhwani?",
        "What are the events conducted by Ehsaas Dramatics Society?",
        "What are the events conducted by Events Team?",
        "What are the events conducted by Rotaract?",
        "What is \"where in bit?\"",
        "What are the details of Cinema Chess Clash?",
        "Tell me something about Dance Saga."
    ];

    const [randomQuestions, setRandomQuestions] = useState([]);
    const chatEndRef = useRef(null);
    const prevChatHistoryLength = useRef(0);

    const getRandomQuestions = () => {
        const shuffled = [...predefinedQuestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    useEffect(() => {
        setRandomQuestions(getRandomQuestions());
    }, []);

    const handlePredefinedQuestion = (question) => {
        setIsPredefinedQuestion(true);
        setTimeout(() => {
            setPrompt(question.toLowerCase());
        }, 200);
    };

    useEffect(() => {
        if (isPredefinedQuestion && prompt.trim()) {
            handleSearch();
            setIsPredefinedQuestion(false);
        }
    }, [prompt]);

    useEffect(() => {
        const currentQuestion = questions[currentQuestionIndex];
        let timer;

        if (isDeleting) {
            timer = setTimeout(() => {
                setPlaceholderText(currentQuestion.substring(0, placeholderText.length - 1));
                if (placeholderText.length === 0) {
                    setIsDeleting(false);
                    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
                    setTypingSpeed(50);
                }
            }, typingSpeed);
        } else if (placeholderText.length === currentQuestion.length) {
            timer = setTimeout(() => {
                setIsDeleting(true);
                setTypingSpeed(50);
            }, 500);
        } else {
            timer = setTimeout(() => {
                setPlaceholderText(currentQuestion.substring(0, placeholderText.length + 1));
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [placeholderText, isDeleting, currentQuestionIndex, typingSpeed]);

    const handleSearch = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setError(null);

        const cleanedPrompt = prompt.replace(/[^a-zA-Z0-9\s]/g, '');

        setChatHistory((prev) => [...prev, { type: 'user', text: cleanedPrompt }]);
        setPrompt('');

        setChatHistory((prev) => [...prev, { type: 'bot', text: 'loading', isLoading: true }]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: cleanedPrompt, filename: 'chunks' }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || response.statusText);
            }

            const data = await response.json();
            let sanitizedResponse = data.geminiResponse.replace(/<br\s*\/?>/gi, '');
            sanitizedResponse = sanitizedResponse.replace(/^\n+/, '');

            setBotTypingText(sanitizedResponse);
            setBotTypingIndex(0);

            setChatHistory((prev) => [
                ...prev.slice(0, -1),
                { type: 'bot', text: '', isLoading: false },
            ]);

            const typingInterval = setInterval(() => {
                setChatHistory((prev) => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage.type === 'bot' && lastMessage.text.length < sanitizedResponse.length) {
                        const newText = sanitizedResponse.substring(0, lastMessage.text.length + 1);
                        return [
                            ...prev.slice(0, -1),
                            { ...lastMessage, text: newText },
                        ];
                    } else {
                        clearInterval(typingInterval);
                        return prev;
                    }
                });
            }, 10);

            setRandomQuestions(getRandomQuestions());
        } catch (err) {
            console.error("Error searching chunks:", err);
            setError("Error searching chunks: " + err.message);

            setChatHistory((prev) => [
                ...prev.slice(0, -1),
                { type: 'bot', text: "Sorry, something went wrong. Please try again.", isLoading: false },
            ]);
        } finally {
            setLoading(false);
            setIsQuestionAsked(true);
        }
    };

    const chatHistoryContainerRef = useRef(null);

    useEffect(() => {
        if (chatHistoryContainerRef.current) {
            chatHistoryContainerRef.current.scrollTop = chatHistoryContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    useEffect(() => {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            if (isPopupOpen) {
                mainContent.classList.add('chatbot-open');
            } else {
                mainContent.classList.remove('chatbot-open');
            }
        }
    }, [isPopupOpen]);

    return (
        <>
            {/* Chatbot Toggle Button */}
            <button
                onClick={() => setIsPopupOpen(!isPopupOpen)}
                className={`fixed bottom-8 transition-all duration-300 ${
                    isPopupOpen ? 'right-[26rem]' : 'right-8'
                } bg-[#E18E04]/20 text-[#FCE2BF] font-bold rounded-lg border border-[#E18E04]/50 backdrop-blur-md hover:bg-[#E18E04]/40 hover:shadow-neon-orange focus:outline-none focus:shadow-neon-orange disabled:bg-[#a53302]/20 disabled:cursor-not-allowed flex items-center justify-center gap-2 group p-4 chatbot-toggle-button`}
            >
                <img
                    src="chat-bot.png"
                    alt="Chatbot Icon"
                    className="w-10 h-10"
                />
            </button>

            {/* Chatbot Popup */}
            <div
                className={`fixed bottom-0 right-0 w-96 h-full bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-white font-sans flex flex-col items-center rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ${
                    isPopupOpen ? 'translate-x-0' : 'translate-x-full'
                } chatbot-popup`}
            >
                {/* Vertical Close Button */}
                <button
                    onClick={() => setIsPopupOpen(false)}
                    className="fixed left-0 top-1/2 transform -translate-y-1/2 w-10 h-32 bg-[#E18E04]/20 text-[#FCE2BF] font-bold rounded-r-lg border border-[#E18E04]/50 backdrop-blur-md hover:bg-[#E18E04]/40 hover:shadow-neon-orange focus:outline-none focus:shadow-neon-orange transition-all duration-300 flex items-center justify-center z-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                </button>

                {/* Popup Content */}
                <div className="w-full max-w-3xl z-10 px-4 pb-8 flex flex-col items-center h-full">
                    {/* "Ask Me Anything" Title and Close Button */}
                    <div className="w-full flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] via-[#F6F1E2] to-[#EFCA4E]">
                            Ask Me Anything
                        </h1>
                    </div>

                    {/* Chat History with Texting Bubbles */}
                    <div
                        ref={chatHistoryContainerRef}
                        className="w-full mb-6 space-y-4 overflow-y-auto flex-1 px-4"
                        style={{ maxHeight: 'calc(100vh - 300px)' }}
                    >
                        {chatHistory.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                {message.isLoading ? (
                                    <div className="loader"></div>
                                ) : (
                                    <div
                                        className={`max-w-[70%] p-4 rounded-lg text-sm backdrop-blur-md ${message.type === 'user'
                                            ? 'bg-[#813C01]/20 border border-[#813C01]/50 text-[#FCE2BF] shadow-neon-red'
                                            : 'bg-[#E18E04]/20 border border-[#E18E04]/50 text-[#FCE2BF] shadow-neon-orange'
                                            } transition-all duration-300 hover:scale-105`}
                                    >
                                        <p className="whitespace-pre-wrap">{message.text}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={chatEndRef}></div>
                    </div>

                    {/* Input and Ask Button */}
                    <div className="w-full flex flex-col md:flex-row gap-4 mb-4">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value.toLowerCase())}
                            placeholder={placeholderText}
                            className="w-full px-4 py-2 bg-[#FCE2BF]/10 text-[#FCE2BF] border border-[#E18E04]/50 rounded-lg backdrop-blur-md focus:outline-none focus:border-[#E18E04] focus:shadow-neon-orange transition-all duration-300"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !loading) {
                                    handleSearch();
                                }
                            }}
                            disabled={loading}
                        />
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="w-full md:w-auto px-6 py-2 bg-[#E18E04]/20 text-[#FCE2BF] font-bold rounded-lg border border-[#E18E04]/50 backdrop-blur-md hover:bg-[#E18E04]/40 hover:shadow-neon-orange focus:outline-none focus:shadow-neon-orange transition-all duration-300 disabled:bg-[#a53302]/20 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <div className="button-loader"></div>
                            ) : (
                                <>
                                    <span>Ask</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 jiggle-animation"
                                    >
                                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Predefined Question Buttons */}
                    <div className="w-full flex flex-col md:flex-row gap-2">
                        {randomQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => handlePredefinedQuestion(question)}
                                disabled={loading}
                                className="w-full px-4 py-2 bg-[#fce2bf]/40 text-[white] text-sm font-bold rounded-lg border border-[#E18E04]/50 backdrop-blur-md hover:bg-[#E18E04]/40 hover:shadow-neon-orange focus:outline-none focus:shadow-neon-orange transition-all duration-300 disabled:bg-[#a53302]/20 disabled:cursor-not-allowed"
                            >
                                {question}
                            </button>
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-400 mt-4 text-center font-semibold neon-text-red">
                            {error}
                        </p>
                    )}
                </div>
            </div>

            {/* Style JSX */}
            <style jsx>{`
                @keyframes jiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(10deg); }
                    50% { transform: rotate(-10deg); }
                    75% { transform: rotate(7deg); }
                }

                .group:hover .jiggle-animation {
                    animation: jiggle 0.3s ease-in-out;
                }

                .loader {
                    width: 40px;
                    aspect-ratio: 1;
                    border-radius: 50%;
                    background: #f03355;
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                    animation: l1 2s infinite cubic-bezier(0.3, 1, 0, 1);
                }

                @keyframes l1 {
                    33% {
                        border-radius: 0;
                        background: #514b82;
                        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                    }
                    66% {
                        border-radius: 0;
                        background: #ffa516;
                        clip-path: polygon(50% 0, 50% 0, 100% 100%, 0 100%);
                    }
                }

                .button-loader {
                    width: 24px;
                    height: 24px;
                    --c: no-repeat linear-gradient(#FCE2BF 0 0);
                    background: 
                        var(--c) 0    0, 
                        var(--c) 50%  50%, 
                        var(--c) 100% 100%;
                    background-size: 20% 20%;
                    animation: l17 1s infinite alternate;
                }

                @keyframes l17 {
                    0%,
                    10%  {background-size:20% 100%}
                    50%  {background-size:20% 20%}
                    90%,
                    100% {background-size:100% 20%}
                }

                .neon-text-red {
                    text-shadow: 0 0 5px #FCE2BF, 0 0 10px #FCE2BF, 0 0 20px #B92A18, 0 0 40px #B92A18;
                }

                .shadow-neon-orange {
                    box-shadow: 0 0 5px #E18E04, 0 0 10px #E18E04, 0 0 20px #E18E04;
                }

                .shadow-neon-red {
                    box-shadow: 0 0 5px #B92A18, 0 0 10px #B92A18, 0 0 20px #B92A18;
                }

                .main-content {
                    transition: margin-right 0.3s ease-in-out;
                }

                .main-content.chatbot-open {
                    margin-right: 24rem;
                }

                @media (max-width: 640px) {
                    .chatbot-toggle-button {
                        right: 1rem !important; /* Keep the button closer to the right edge on mobile */
                    }

                    .chatbot-popup {
                        width: 100% !important; /* Make the popup full width on mobile */
                        right: 0 !important; /* Align the popup to the right edge */
                    }

                    .main-content.chatbot-open {
                        margin-right: 0 !important; /* Remove margin adjustment on mobile */
                    }
                }
            `}</style>
        </>
    );
}