import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-polar">
            <div className="w-full max-w-md p-4">
                <SignUp />
            </div>
        </div>
    );
}
