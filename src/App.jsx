import { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(`/v1/${email}/verification`);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data || 'Failed to verify email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Email Verifier</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter an email address to verify its validity
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{result.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Valid Syntax</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {result.syntax.valid ? '✅ Yes' : '❌ No'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Reachable</dt>
                  <dd className="mt-1 text-sm text-gray-900">{result.reachable}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Disposable</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {result.disposable ? '⚠️ Yes' : '✅ No'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Role Account</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {result.role_account ? '⚠️ Yes' : '✅ No'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Free Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {result.free ? '⚠️ Yes' : '✅ No'}
                  </dd>
                </div>
                {result.suggestion && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Suggested Domain</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.suggestion}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;