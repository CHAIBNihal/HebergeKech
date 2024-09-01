import CredentialsProvider from "next-auth/providers/credentials";
import { setCookie, parseCookies } from 'nookies';
import { NextAuthOptions } from "next-auth";






export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "admin-login", // Identifiant unique pour les administrateurs
      name: "Admin-Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const requestBody = {
          email: credentials?.email,
          password: credentials?.password,
        };
        
        try {
          const res = await fetch("http://localhost:3000/api/admin/LoginAdmin", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) return null;

          const resData = await res.json();
          if (!resData.success) return null;

          return {
            _id: resData.user._id,
            isVerified: true,
            email: resData.user.email,
            fullName: resData.user.fullName,
            role: resData.user.role,
          };
        } catch (error) {
          console.error("Error during admin authorize:", error);
          return null;
        }
      },
    }),

    CredentialsProvider({
      id: "client-login", // Identifiant unique pour les clients
      name: "Client Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const requestBody = {
          email: credentials?.email,
          password: credentials?.password,
        };
        
        try {
          const res = await fetch("http://localhost:3000/api/client/LoginClient", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) return null;

          const resData = await res.json();
          if (!resData.success) return null;
          

          return {
            _id: resData.user._id,
            isVerified: true,
            email: resData.user.email,
            fullName: resData.user.fullName,
            role: resData.user.role,
            token : resData.token
          };
        } catch (error) {
          console.error("Error during client authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.fullName = user.fullName;
        token.email = user.email;
        token.role = account?.provider === "admin-login" ? "admin" : "user";
        token.provider = account.provider;
        token.token = user.token;
        console.log('User Provider is : ', user.provider)
        console.log("Token Role is : ",token.role);
        const cookieName = token.provider === "admin-login" ? "admin-token" : "user-token";
        setCookie(null, cookieName, JSON.stringify(token), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });

        console.log("Cookie set: ", cookieName, JSON.stringify(token));
      } else if (!account && token.provider) {
        console.log("Restoring provider from token: ", token.provider);
        
      } else {
        console.log("JWT callback invoked without account or provider information.");
      }

      return token;
    },

    async session({ session, token }) {
      const cookies = parseCookies();
      let sessionToken;
      console.log(session.user.token);
      console.log("Session callback invoked with token provider: ", token.provider);

      // Récupérer le token approprié à partir des cookies
      console.log("Token Provider", token.provider)
      if (token.provider === "admin-login") {
        sessionToken = cookies["admin-token"];
        console.log("Cookies de l'admin ",cookies)
      } else if (token.provider === "client-login") {
        sessionToken = cookies["user-token"];
        console.log("Cookies de client  ",cookies)
      }

      console.log("Cookies: ", cookies);
      console.log("Session-Token: ", sessionToken);

      if (sessionToken) {
        const storedToken = JSON.parse(sessionToken);
        session.user._id = storedToken._id;
        session.user.role = storedToken.role;
        session.user.provider = storedToken.provider;
      } else {
        console.log("No session token found in cookies.");
      }
      
      if(token){
        session.user._id = token?._id;
        session.user.fullName = token.fullName;
        session.user.email = token.email;
        session.user.token = token.token;
        session.user.role = token.role;
        session.user.provider = token.provider;

      }
      console.log("Session : ",session)
      return session;
    },
  },
 cookies : {
  sessionToken : {
    name : "next-auth.session-token", 
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true
    }
  }
 },
  secret: process.env.NEXTAUTH_SECRET, 
};

