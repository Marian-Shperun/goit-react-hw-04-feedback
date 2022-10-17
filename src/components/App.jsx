import React, { useEffect, useState } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

export const App = () => {
  const [feedback, setFeedback] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('feedback')) ?? {
        good: 0,
        neutral: 2,
        bad: 3,
      }
    );
  });

  useEffect(() => {
    window.localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const totalFeedback = () => {
    const total = feedback.good + feedback.neutral + feedback.bad;
    return total || false;
  };

  const countPositiveFeedbackPercentage = (good, total) => {
    const positiveFeedback = Math.round((good / total) * 100);
    return positiveFeedback;
  };

  const clickBtnFeedback = e => {
    const targetElement = e.target.textContent;

    setFeedback(prevState => ({
      ...prevState,
      [targetElement]: prevState[targetElement] + 1,
    }));
  };



  return (
    <Section title="Please leave feedback">
      <FeedbackOptions
        options={feedback}
        onLeaveFeedback={clickBtnFeedback}
        type="button"
      />

      {totalFeedback() ? (
        <>
          <Statistics
            title="Statistics"
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage}
          />
          <button
            type="button"
            onClick={() => {
              setFeedback({ good: 0, neutral: 0, bad: 0 });
            }}
          >
            Clear statistics
          </button>
        </>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Section>
  );
};
