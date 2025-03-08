'use client'
import { useState, useEffect } from 'react'

export default function TypeWriter({ messages, delay = 100, pauseTime = 2000 }) {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    let timeout

    if (currentText === messages[currentMessageIndex]) {
      timeout = setTimeout(() => {
        setCurrentText('')
        setCurrentIndex(0)
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
      }, pauseTime)
      return () => clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      setCurrentText(messages[currentMessageIndex].slice(0, currentIndex + 1))
      setCurrentIndex((prev) => prev + 1)
    }, delay)

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, currentMessageIndex, messages, delay, pauseTime])

  return (
    <span className="inline-block min-h-[1.5em]">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}