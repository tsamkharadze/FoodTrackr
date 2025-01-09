import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { profileAtom } from "@/store/auth";

const AvatarComp = ({
  onAvatarSelect,
}: {
  onAvatarSelect: (avatarSvg: string) => void;
}) => {
  const profile = useAtomValue(profileAtom);
  const actualAvatar = profile?.avatar_url;

  // ავატარებია
  const avatarConfigs = [
    { seed: "John Tsaavaa", clothesColor: ["3c4f5c", "65c9ff"] },
    { seed: "Tornike samkharadze", clothesColor: ["ecadff", "fc909f"] },
    { seed: "Nika phartsvania", clothesColor: ["f9c9b6", "ac6651"] },
    { seed: "Luka badali", clothesColor: ["b1e2ff", "f4d150"] },
    { seed: "Zaza Gordeziani", clothesColor: ["ffc6a5", "8e44ad"] },
    { seed: "sopiko imnaishvili", clothesColor: ["48dbfb", "10ac84"] },
    { seed: "Ana zhuzhunashvili", clothesColor: ["576574", "ee5253"] },
    { seed: "teona2 omiadze", clothesColor: ["feca57", "1dd1a1"] },
  ];

  // ავატარების დაგენერირება
  const avatars = avatarConfigs.map((config) =>
    createAvatar(avataaars, config).toString(),
  );

  // ჩემი სერვერიდან მიღებული ავატარის ინდექსის განსაზღვრა
  const actualIndex = actualAvatar ? avatars.indexOf(actualAvatar) : -1;

  // ჩასეტვა ინდექსში დიფოლტ ველიუდ, რომ ჩემი ავატარი იყოს ირგვლივ გაფერადებული
  const [selectedIndex, setSelectedIndex] = useState<number>(
    actualIndex !== -1 ? actualIndex : 0,
  );

  useEffect(() => {
    if (actualIndex !== -1) {
      setSelectedIndex(actualIndex);
    }
  }, [actualIndex]);

  useEffect(() => {
    onAvatarSelect(avatars[selectedIndex]);
  }, [selectedIndex, avatars, onAvatarSelect]);

  return (
    <div className="mx-auto max-w-xl p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Choose Your Avatar
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {avatars.map((svg, index) => (
          <div
            key={index}
            className={`relative cursor-pointer rounded-lg p-1 ${
              selectedIndex === index
                ? "ring-4 ring-blue-500"
                : "ring-2 ring-gray-300"
            }`}
            onClick={() => setSelectedIndex(index)}
          >
            <div
              className="aspect-square w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        ))}
      </div>
      <h3 className="mt-6 text-center text-xl font-semibold">
        Selected Avatar
      </h3>
      <div
        className="mx-auto mt-4 h-32 w-32 rounded-lg border border-blue-500 p-4"
        dangerouslySetInnerHTML={{
          __html: avatars[selectedIndex],
        }}
      />
    </div>
  );
};

export default AvatarComp;
