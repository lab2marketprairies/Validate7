import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-polar">
            <div className="w-full max-w-md p-4">
                <SignIn />
            </div>
        </div>
    );
}
