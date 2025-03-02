"use client"
import { useState, useEffect, useRef } from 'react';

export default function Home() {
    // Chatbot States
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chatHistory, setChatHistory] = useState([]); // Chat history array
    const [isPredefinedQuestion, setIsPredefinedQuestion] = useState(false); // New state
    const [isQuestionAsked, setIsQuestionAsked] = useState(false); // Track if a question has been asked
    const isInitialRender = useRef(true);
    const [placeholderText, setPlaceholderText] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(50);
    const questions = [
        "What events are conducted by IEEE?",
        "Whom should I contact for CSS Battle?",
        "What is the timing for Talking Prompt?",
        "What is the category of Codezilla?",
    ];

    // Predefined questions for the buttons
    const predefinedQuestions = [
        "What is the timing for Codezilla?",
        "What events are conducted by EDC?",
        "Whom to contact regarding SDS events?",
    ];

    // Ref for the last message in the chat history
    const chatEndRef = useRef(null);
    const prevChatHistoryLength = useRef(0);

    useEffect(() => {
        // Skip the scroll behavior on initial render or page refresh
        if (chatHistory.length > prevChatHistoryLength.current) {
            if (chatEndRef.current) {
                // Calculate the offset (e.g., 200px above the footer)
                const offset = 280; // Adjust this value as needed
                const elementPosition = chatEndRef.current.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        }
    
        // Update the previous chat history length
        prevChatHistoryLength.current = chatHistory.length;
    }, [chatHistory]); // Trigger when chatHistory changes// Trigger when chatHistory changes; // Trigger when chatHistory changes

    // Handle predefined question button click
    const handlePredefinedQuestion = (question) => {
        setIsPredefinedQuestion(true); // Mark as predefined question
        setTimeout(() => {
        setPrompt(question.toLowerCase()); // Set the prompt state
        }, 200)
    };

    // Use useEffect to trigger handleSearch when prompt changes (only for predefined questions)
    useEffect(() => {
        if (isPredefinedQuestion && prompt.trim()) { // Only call handleSearch for predefined questions
            handleSearch();
            setIsPredefinedQuestion(false); // Reset the flag
        }
    }, [prompt]); // Dependency on prompt

    useEffect(() => {
        const currentQuestion = questions[currentQuestionIndex];
        let timer;

        if (isDeleting) {
            // Delete text
            timer = setTimeout(() => {
                setPlaceholderText(currentQuestion.substring(0, placeholderText.length - 1));
                if (placeholderText.length === 0) {
                    setIsDeleting(false);
                    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length); // Move to the next question
                    setTypingSpeed(50); // Reset typing speed
                }
            }, typingSpeed);
        } else {
            // Type text
            timer = setTimeout(() => {
                setPlaceholderText(currentQuestion.substring(0, placeholderText.length + 1));
                if (placeholderText.length === currentQuestion.length) {
                    setIsDeleting(true);
                    setTypingSpeed(50); // Faster deletion speed
                }
            }, typingSpeed);
        }

        return () => clearTimeout(timer); // Cleanup timer
    }, [placeholderText, isDeleting, currentQuestionIndex, typingSpeed]);

    // Handle Chatbot Search
    const handleSearch = async () => {
        if (!prompt.trim()) return; // Ignore empty prompts

        setLoading(true);
        setError(null);

        // Strip special characters from the prompt
        const cleanedPrompt = prompt.replace(/[^a-zA-Z0-9\s]/g, '');

        // Add user message to chat history immediately
        setChatHistory((prev) => [...prev, { type: 'user', text: cleanedPrompt }]);
        setPrompt(''); // Clear input after sending

        // Add a temporary bot message with the custom spinner
        setChatHistory((prev) => [...prev, { type: 'bot', text: 'loading', isLoading: true }]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: cleanedPrompt, filename: 'chunks' }), // Use cleanedPrompt
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || response.statusText);
            }

            const data = await response.json();

            // Replace the spinner with the actual bot response
            setChatHistory((prev) => [
                ...prev.slice(0, -1), // Remove the last message (spinner)
                { type: 'bot', text: data.geminiResponse, isLoading: false }, // Add the actual response
            ]);
        } catch (err) {
            console.error("Error searching chunks:", err);
            setError("Error searching chunks: " + err.message);

            // Replace the spinner with an error message
            setChatHistory((prev) => [
                ...prev.slice(0, -1), // Remove the last message (spinner)
                { type: 'bot', text: "Sorry, something went wrong. Please try again.", isLoading: false },
            ]);
        } finally {
            setLoading(false);
            setIsQuestionAsked(true); // Set isQuestionAsked to true after a question is asked
        }
    };

    return (
        <div className="min-h-screen text-white font-sans flex flex-col items-center relative overflow-y-auto">
            {/* Background Components */}
            {/* Chatbot Interface */}
            <div className="w-full max-w-3xl z-10 px-4 pb-8 flex flex-col items-center" style={{ marginTop: '11rem' }}>
                <h1 className="text-5xl font-bold mb-8 text-center text-[#FCE2BF] neon-text">
                    Ask Me Anything
                </h1>

                {/* Chat History with Texting Bubbles */}
                <div className="w-full mb-6 space-y-4">
                    {chatHistory.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            {message.isLoading ? ( // Show only the spinner if loading
                                <div className="loader"></div>
                            ) : (
                                <div
                                    className={`max-w-[70%] p-4 rounded-lg backdrop-blur-md ${message.type === 'user'
                                            ? 'bg-[#813C01]/20 border border-[#813C01]/50 text-[#FCE2BF] shadow-neon-red' // User bubble
                                            : 'bg-[#E18E04]/20 border border-[#E18E04]/50 text-[#FCE2BF] shadow-neon-orange' // Bot bubble
                                        } transition-all duration-300 hover:scale-105`}
                                >
                                    <p className="whitespace-pre-wrap">{message.text}</p>
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Empty div to act as the scroll target */}
                    <div ref={chatEndRef}></div>
                </div>

                {/* Input and Ask Button */}
                <div className="w-full flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value.toLowerCase())}
                        placeholder={placeholderText} // Dynamic placeholder text
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
                    {predefinedQuestions.map((question, index) => (
                        <button
                            key={index}
                            onClick={() => handlePredefinedQuestion(question)}
                            disabled={loading}
                            className="w-full px-4 py-2 bg-[#fce2bf]/40 text-[white] font-bold rounded-lg border border-[#E18E04]/50 backdrop-blur-md hover:bg-[#E18E04]/40 hover:shadow-neon-orange focus:outline-none focus:shadow-neon-orange transition-all duration-300 disabled:bg-[#a53302]/20 disabled:cursor-not-allowed"
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

            {/* Custom Spinner Styles */}
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
                    width: 24px; /* Fixed size */
                    height: 24px; /* Fixed size */
                    --c: no-repeat linear-gradient(#FCE2BF 0 0);
                    background: 
                        var(--c) 0    0, 
                        var(--c) 50%  50%, 
                        var(--c) 100% 100%;
                    background-size: 20% 20%; /* Initial size */
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

                @keyframes wave {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                @keyframes wave-reverse {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }

                .animate-wave {
                    animation: wave 10s linear infinite;
                }

                .animate-wave-reverse {
                    animation: wave-reverse 15s linear infinite;
                }
            `}</style>
        </div>
    );
}