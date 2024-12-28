import PropTypes from 'prop-types';

const ResultItem = ({ label, value, type = 'text' }) => {
  let displayValue = value;
  
  if (type === 'boolean') {
    displayValue = value ? '✅ Yes' : '❌ No';
  } else if (type === 'warning') {
    displayValue = value ? '⚠️ Yes' : '✅ No';
  }

  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{displayValue}</dd>
    </div>
  );
};

ResultItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['text', 'boolean', 'warning']),
};

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
          <ResultItem label="Email" value={result.email} />
          <ResultItem label="Valid Syntax" value={result.syntax.valid} type="boolean" />
          <ResultItem label="Reachable" value={result.reachable} />
          <ResultItem label="Disposable" value={result.disposable} type="warning" />
          <ResultItem label="Role Account" value={result.role_account} type="warning" />
          <ResultItem label="Free Email" value={result.free} type="warning" />
          {result.suggestion && (
            <ResultItem label="Suggested Domain" value={result.suggestion} />
          )}
          {result.smtp && (
            <>
              <ResultItem label="Host Exists" value={result.smtp.host_exists} type="boolean" />
              <ResultItem label="Full Inbox" value={result.smtp.full_inbox} type="warning" />
              <ResultItem label="Catch All" value={result.smtp.catch_all} type="warning" />
              <ResultItem label="Deliverable" value={result.smtp.deliverable} type="boolean" />
            </>
          )}
        </dl>
      </div>
    </div>
  );
}

ResultCard.propTypes = {
  result: PropTypes.object,
};