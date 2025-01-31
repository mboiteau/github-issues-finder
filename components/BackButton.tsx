"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  text: string;
};

function BackButton({ text }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="px-6 py-2 mb-6 bg-red-600 text-white rounded-lg hover:bg-red-500 hover:text-black transition-colors"
    >
      {text}
    </button>
  );
}

export default BackButton;
