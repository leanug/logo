import { auth } from "@/auth"
 
export default auth((req) => {
  console.log('middleware running');
  
  if (!req.auth && req.nextUrl.pathname !== "/dashboard") {
    const newUrl = new URL("/auth/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})