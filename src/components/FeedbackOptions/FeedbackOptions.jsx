import PropTypes from "prop-types";
import '../Feedback.modul.css';

const FeedbackOptions = ({ options, onLeaveFeedback, type }) => {
  return (
    <div>
      {Object.keys(options).map(setElement => {
        return (
          <button key={setElement} type={type} onClick={onLeaveFeedback}>
            {setElement}
          </button>
        );
      })}
    </div>
  );
};

export default FeedbackOptions;
FeedbackOptions.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};
