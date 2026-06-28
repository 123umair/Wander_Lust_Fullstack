import { Loader2 } from "lucide-react";

function Loading({ text = "loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            <p className="text-gray-500 text-lg">{text}</p>
        </div>
    );
}

export default Loading;