import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'


interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {        
        //@ts-ignore
        const { email, password } = credentials
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/auth/login`, {
            email,
            password,
          })          
          return { token: res.data.data.token, user: res.data.data.user }
        } catch (error) { 
          console.log(error);
          return null
        }
      },
    })
  ],
  secret: process.env.JWT_SECRET,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token }) {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/user/profile`, {
          headers: { Authorization: `Bearer ${token.accessToken}` },
        })        
        const data: User = res.data.data
        session.user = data
        session.accessToken = token.accessToken
      } catch (e) {
        console.log({ e });
        
        //@ts-ignore
        session.user = null
      }
      return session
    },
    async jwt({ token, user }) {
      if (token && token.sub) {
        return token
      }

      if (user && user.token) {
        token.accessToken = user.token
      }
      return token
    },
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/logo.png', // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
})
