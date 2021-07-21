import React from 'react';
import styles from './Feedback.module.scss';

import Controls from './Controls';
import Statistics from './Statistics';
import Notification from './Notification';

class Feedback extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  incrementFeedback = feedback => () => {
    this.setState(prevState => {
      return { [feedback]: prevState[feedback] + 1 };
    });
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };
  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const totalFeedback = this.countTotalFeedback();
    return totalFeedback ? Math.round((good * 100) / totalFeedback) : 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    return (
      <section className={styles.container}>
        <h1 className={styles.title}>Please leave feedback</h1>
        <Controls
          options={Object.keys(this.state)}
          incrementFeedback={this.incrementFeedback}
        />
        {good || neutral || bad ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            countTotalFeedback={this.countTotalFeedback}
            countPositiveFeedbackPercentage={
              this.countPositiveFeedbackPercentage
            }
          />
        ) : (
          <Notification />
        )}
      </section>
    );
  }
}
export default Feedback;
