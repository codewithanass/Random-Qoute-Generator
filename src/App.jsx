import Twitter from './assets/twitter.svg'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {
  const [quoteData, setQuoteData] = useState({
    content: "Learning is finding out what you already know.",
    author: "Richard Bach"
  })

  const [allQuotes, setAllQuotes] = useState([])

  useEffect(() => {
    async function getQuote() {
      const res = await fetch("https://api.quotable.io/random?tags=famous-quotes")
      const data = await res.json()
      setAllQuotes([data])
    }
    getQuote()
  }, [quoteData])

  const handleClick = () => {
    const randomQuote = Math.floor(Math.random() * allQuotes.length)
    const quote = allQuotes[randomQuote].content
    const author = allQuotes[randomQuote].author
    setQuoteData(prev => ({
      ...prev,
      content: quote,
      author: author
    }

    ))
  }

  const handleTweet = () => {
    const tweet = `"${quoteData.content}" - ${quoteData.author}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="qoute-box">
      <h2>Qoute of the day</h2>
      <blockquote>{quoteData.content}</blockquote>
      <span>{quoteData.author}</span>
      <div>
        <button className='btn' onClick={handleClick}>New Quote</button>
        <button className='btn btn-light' onClick={handleTweet}><img src={Twitter} alt="twitter-icon" />Tweet</button>
      </div>
    </div>
  )
}

export default App
