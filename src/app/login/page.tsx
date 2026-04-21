'use client';

import { useEffect, useState } from 'react';
import EmailIcon from '@/assets/images/icon-email.svg';
import PasswordIcon from '@/assets/images/icon-password.svg';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

function LoginPage() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    if (emailInput.length < 1) setEmailError(true);
    if (passwordInput.length < 1) setPasswordError(true);
    if (emailInput.length < 1 || passwordInput.length < 1) {
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: emailInput,
      password: passwordInput,
    });

    if (signInError) {
      console.log('Login error: ', signInError.message);
      setError(signInError.message);
      // toast('User not found.', {
      //   icon: <UserRoundX height={20} width={20} className="toastIcon" />,
      // });
    } else {
      router.push('/');
    }

    setLoading(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-grey-50">
      <div className="bg-grey-50 md:bg-white px-7.5 py-10 md:px-10 rounded-xl">
        <h1 className="text-preset-2 md:text-preset-1 text-grey-900 text-left">
          Login
        </h1>
        <p className="text-preset-3 text-grey-500 mt-2 text-left">
          Add your details below to get back into the app
        </p>

        <form
          className="flex flex-col w-full mt-10"
          onSubmit={(e) => handleLogin(e)}
        >
          <label htmlFor="email" className="text-preset-4 text-grey-900">
            Email address
          </label>
          <div className="relative w-full">
            <input
              type="email"
              name="email"
              id="email"
              value={emailInput}
              onChange={(e) => {
                if (emailError) setEmailError(false);
                setEmailInput(e.target.value);
              }}
              placeholder="e.g. alex@email.com"
              className={`mt-2 w-full rounded-lg border ${
                emailError
                  ? 'border-red-500 text-red-500'
                  : 'border-grey-200 text-grey-900 focus-visible:border-purple-600 focus-visible:shadow-md focus-visible:shadow-purple-600'
              } py-4 pl-12 pr-4 placeholder:text-grey-900 outline-none`}
            />
            <EmailIcon className="absolute top-1/2 left-4 -translate-y-[25%] w-4 h-4" />
            {emailError && (
              <p className="text-right mt-2 md:mt-0 md:absolute text-preset-4 right-4 top-1/2 -translate-y-[25%] text-red-500">
                Can't be empty
              </p>
            )}
          </div>

          <label
            htmlFor="password"
            className="text-preset-4 text-grey-900 mt-6"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              type="password"
              name="password"
              id="password"
              value={passwordInput}
              onChange={(e) => {
                if (passwordError) setPasswordError(false);
                setPasswordInput(e.target.value);
              }}
              placeholder="Enter your password"
              className={`mt-2 w-full rounded-lg border ${
                passwordError
                  ? 'border-red-500 text-red-500'
                  : 'border-grey-200 text-grey-900 focus-visible:border-purple-600 focus-visible:shadow-md focus-visible:shadow-purple-600'
              } py-4 pl-12 pr-4 placeholder:text-grey-900 outline-none`}
            />
            <PasswordIcon className="absolute top-1/2 left-4 -translate-y-[25%] w-4 h-4" />
            {passwordError && (
              <p className="text-right mt-2 md:mt-0 md:absolute text-preset-4 right-4 top-1/2 -translate-y-[25%] text-red-500">
                Please check again
              </p>
            )}
          </div>

          {error && (
            <p className="text-center mt-2 text-preset-4 text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={`text-preset-3-semi text-white h-14 mt-6 w-full ${
              loading ? 'bg-purple-300' : 'bg-purple-600'
            } hover:bg-purple-300 rounded-lg cursor-pointer`}
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
