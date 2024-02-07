

import { getServerAuthSession } from '@/server/auth';
import React from 'react'
import Avatar from './avatar';

const Navbar = async() => {

  const session = await getServerAuthSession();

  return (
    <header className="p-4 bg-transparent flex justify-between items-center relative">
      <h1 className="text-2xl font-extrabold tracking-tight">
        <a href="/">YAUS</a>
      </h1>

      {
        session?.user
        ? <Avatar user={session.user}/>
        : <a href="/api/auth/signin/github">Sign In</a>
      }
    </header>
  )
}

export default Navbar;