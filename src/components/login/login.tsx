// REACT
import React from 'react';

// NEXT
import Image from 'next/image';
import { useRouter } from 'next/router';

// LOGO
import ML_LOGO from '@/logos/ML_logo.png';

function Login() {
  const router = useRouter();

  return (
    <div className="w-[350px] md:w-[370px] lg:w-[400px] bg-white rounded-md shadow p-5 flex flex-col items-center gap-16">
      <Image
        alt="ML Logo"
        src={ML_LOGO}
        width={80}
        height={80}
        className="rounded-full"
      />
      <div className="flex flex-col items-center gap-10 mt-5">
        <h1 className="font-bold text-center text-h1Font">
          ML Loans Platform v2.0 Login
        </h1>

        <button
          className="bg-secondary px-10 py-3 rounded text-white hover:scale-110 duration-300"
          onClick={handleLogin}
        >
          Login to KPX
        </button>
      </div>

      <div>
        <p className="text-paragraphFont font-thin text-xs text-center">
          {` Copyright © ${getFullYear()} MLhuillier, Inc. Philippines. All rights reserved.`}
        </p>
      </div>
    </div>
  );

  // HANDLERS
  function handleLogin() {
    router.push('/dashboard');
  }

  function getFullYear() {
    return new Date().getFullYear();
  }
}

export default Login;
