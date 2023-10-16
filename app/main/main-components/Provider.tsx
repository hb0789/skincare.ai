"use client";
import React, {ReactNode} from 'react'
import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'

interface Props {
    children: ReactNode;
}

const Provider = (props: Props) => {
  return (
    <div>
      <SessionProvider>{props.children}</SessionProvider>
    </div>
  )
}

export default Provider
