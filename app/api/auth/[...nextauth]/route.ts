import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
          clientId: "955599805999-ppo2e1ogdi5j7v875magva9g6f8fhj6k.apps.googleusercontent.com",
          clientSecret: "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",
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        })
      ],
  }
  
const handler = NextAuth(authOptions);

export{handler as GET, handler as POST};

