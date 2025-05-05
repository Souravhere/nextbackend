import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(){
        return NextResponse.next()
    },
    {
        callbacks:{
            authorized: ({token, req})=> {
                const {pathname} = req.nextUrl;

                // allow path without auth
                if(
                    pathname.startsWith("/api/auth") || 
                    pathname === "/login" ||
                    pathname === "/register"
                ){return true}

                // public path name 
                if(pathname === "/" || pathname.startsWith("/api/videos")){
                    return true
                }

                // other remaing paths are required auth 'login'
                return !!token
            }
        }
    }
)

// export the middleware 

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico/public/).*)"]
};