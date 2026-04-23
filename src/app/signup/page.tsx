'use client';

import { useEffect, useState } from 'react';
import EmailIcon from '@/assets/images/icon-email.svg';
import PasswordIcon from '@/assets/images/icon-password.svg';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';
import { generateUsername } from '@/lib/utils/generateUsername';

function SignupPage() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmInput, setConfirmInput] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const handleSignup = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    if (emailInput.length < 1) setEmailError(true);
    if (passwordInput.length < 1 || passwordInput.length < 8)
      setPasswordError(true);
    if (
      emailInput.length < 1 ||
      passwordInput.length < 1 ||
      passwordInput.length < 8
    ) {
      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: emailInput,
      password: passwordInput,
    });

    if (signUpError) {
      console.log('Login error: ', signUpError.message);
      setError(signUpError.message);
    } else {
      const user = data.user;
      const username = generateUsername();

      await supabase.auth.updateUser({
        data: {
          username,
        },
      });

      await supabase.from('profiles').insert({
        id: user?.id,
        email: user?.email,
        username,
      });

      router.push('/');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (passwordInput && confirmInput !== passwordInput) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }
  }, [confirmInput]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col justify-start md:justify-center w-screen min-h-screen bg-grey-50 pt-8 py-8">
      <div className="flex justify-start md:justify-center w-full max-w-119 px-7.5 md:px-10 mx-auto">
        <img
          src="/images/logo-devlinks-large.svg"
          alt="devlinks logo"
          className="w-[182.5px] h-10 -ml-1"
        />
      </div>
      <div className="flex-1 mx-auto bg-grey-50 w-full md:min-w-119 max-w-119 md:bg-white px-7.5 py-10 md:px-10 mt-12 rounded-xl">
        <h1 className="text-preset-2 md:text-preset-1 text-grey-900 text-left">
          Create account
        </h1>
        <p className="text-preset-3 text-grey-500 mt-2 text-left">
          Let's get you started sharing your links!
        </p>

        <form
          className="flex flex-col w-full mt-10"
          onSubmit={(e) => handleSignup(e)}
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
            Create password
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
              placeholder="At least 8 characters"
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

          <label
            htmlFor="confirm-password"
            className="text-preset-4 text-grey-900 mt-6"
          >
            Confirm password
          </label>
          <div className="relative w-full">
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder="At least 8 characters"
              className={`text-preset-3 mt-2 w-full rounded-lg border ${
                confirmError
                  ? 'border-red-500 text-red-500'
                  : 'border-grey-200 text-grey-900 focus-visible:border-purple-600 focus-visible:shadow-md focus-visible:shadow-purple-600'
              } py-4 pl-12 pr-4 placeholder:text-preset-3 placeholder:text-grey-900 outline-none`}
            />
            <PasswordIcon className="absolute top-1/2 left-4 -translate-y-[25%] w-4 h-4" />
            {confirmError && (
              <p className="text-right mt-2 md:mt-0 md:absolute text-preset-4 right-4 top-1/2 -translate-y-[25%] text-red-500">
                Does not match
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
            {loading ? <LoadingSpinner /> : 'Create new account'}
          </button>
        </form>
        <p className="text-preset-3 text-grey-500 mt-6 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-preset-3 text-purple-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
