import Image from "next/image";

type AvatarProfileProps = { imageUrl: string; size: number };

function AvatarProfile({ imageUrl, size }: AvatarProfileProps) {
  return (
    <Image
      src={imageUrl || "https://github.com/github.png"}
      width={size}
      height={size}
      alt="Author image"
      className="rounded-full border-2 border-gray-300 shadow-sm"
    />
  );
}

export default AvatarProfile;
