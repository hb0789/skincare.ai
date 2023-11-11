import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { CredentialsProvider } from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/app/HOCS/firebase"
import { SessionProvider } from "next-auth/react";

const authOptions = {

    // Configure one or more authentication providers
    // pages:{
    //   signIn:"/main/login",
    // },
    
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          secret: process.env.NEXTAUTH_SECRET,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        }),
        {
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
          },
          authorize: async (credentials) => {
            try {
              const userCredential = await signInWithEmailAndPassword(
                auth,
                credentials.email || "",
                credentials.password || ""
              );
                console.log("logged")
              if (userCredential.user) {
                return Promise.resolve(userCredential.user);
              }
    
              return Promise.resolve(null);
            } catch (error) {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error(errorCode, errorMessage);
              return null;
            }
          },
        },
      ],
  }
  
const handler = NextAuth(authOptions);

export{handler as GET, handler as POST ,handler};

