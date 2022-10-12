import React, { Component } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback(good, neutral, bad) {
    const total = good + neutral + bad;
    return total || false;
  }

  countPositiveFeedbackPercentage(good, callback) {
    const positiveFeedback = Math.round((good / callback) * 100);
    return positiveFeedback;
  }

  clickBtnFeedback = e => {
    const targetElement = e.target.textContent;
    this.setState(() => ({
      [targetElement]: this.state[targetElement] + 1,
    }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback(good, neutral, bad);
    return (
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={this.state}
          onLeaveFeedback={this.clickBtnFeedback}
          type="button"
        />

        {!total && <Notification message="There is no feedback" />}

        {total && (
          <Statistics
            title="Statistics"
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={this.countPositiveFeedbackPercentage}
          />
        )}
      </Section>
    );
  }
}
