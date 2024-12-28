import PropTypes from 'prop-types';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};