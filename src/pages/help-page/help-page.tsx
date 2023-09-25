import React, { useState } from 'react';
import './help-page.css';

const Help = () => {
  const [showAnswers, setShowAnswers] = useState(Array(5).fill(false));

  const toggleAnswer = (index: number) => {
    setShowAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = !newAnswers[index];
      return newAnswers;
    });
  };

  const faqs = [
    {
      question: 'Question 1',
      answer: 'Answer to Question 1 goes here.',
    },
    {
      question: 'Question 2',
      answer: 'Answer to Question 2 goes here.',
    },
    {
      question: 'Question 3',
      answer: 'Answer to Question 3 goes here.',
    },
    {
      question: 'Question 4',
      answer: 'Answer to Question 4 goes here.',
    },
    {
      question: 'Question 5',
      answer: 'Answer to Question 5 goes here.',
    },
  ];

  return (
    <div className="help-page">
      <h1>Help Center</h1>
      <p>Welcome to our Help Center. Here you can find links to our GitHub, Documentation as well as answers to frequently asked questions regarding how to correctly use the app.</p>

      <div className="links">
        <a href="https://github.com/SODF-Group-Project-Organization/SODF-Code" className="btn">
          Visit our GitHub
        </a>
        <a href="https://docs.example.com" className="btn">
          View our Documentation
        </a>
      </div>

      <div className="faq-container">
      {faqs.map((faq, index) => (
  <div key={index} className="faq-question" onClick={() => toggleAnswer(index)}>
    <h3>{faq.question}</h3>
    <div className="plus-minus">{showAnswers[index] ? '-' : '+'}</div>
    <div className={`faq-answer-container ${showAnswers[index] ? 'show' : ''}`}>
      <p>{faq.answer}</p>
    </div>
  </div>
))}
      </div>
    </div>
  );
};

export default Help;
