// Login button component using NextAuth.js
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
 export function LoginButton() {    
    const { data: session } = useSession();

    return (
        <Button
            variant="outline"
            onClick={() => (session ? signOut() : signIn("google"))}
            className="w-full"
        >
            {session ? (
                <>
                    <Icons.user className="mr-2 h-4 w-4" />
                    Sign out
                </>
            ) : (
                <>
                    <Icons.google className="mr-2 h-4 w-4" />
                    Sign in with Google
                </>
            )}
        </Button>
    );
}
// This component uses the `signIn` and `signOut` functions from NextAuth.js to handle user authentication.
// It also uses the `useSession` hook to determine if a user is currently signed in or not.
// Depending on the authentication state, it displays either a "Sign in with Google" button or a "Sign out" button.
// The button also includes an icon to enhance the user experience.
