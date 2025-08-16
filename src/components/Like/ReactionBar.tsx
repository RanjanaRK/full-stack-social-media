"use client";
import createLike from "@/actions/like/createLike.action";
import { Emojis } from "@prisma/client";
import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type ReactionBarProps = {
  postId: string;
  currentUserReact: Emojis | null;
};

const emojiMap: Record<Emojis, string> = {
  LOVE: "❤️",
  LIKE: "👍",
  HAHA: "😂",
  FIRE: "🔥",
  CRY: "😢",
};

const ReactionBar = ({ postId, currentUserReact }: ReactionBarProps) => {
  const [open, setOpen] = useState(false);

  const entries = Object.entries(emojiMap) as [Emojis, string][];

  const handleReaction = async (emojiReact: Emojis) => {
    const { success, message } = await createLike({
      postId: postId,
      emoji: emojiReact,
    });

    console.log(success, message);
    setOpen(false);
  };

  return (
    <>
      <div className="relative inline-block">
        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileTap={{ y: 1 }}
          className="flex items-center"
        >
          {currentUserReact ? (
            emojiMap[currentUserReact]
          ) : (
            <Heart className="h-4 w-4" />
          )}
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="bg-background absolute bottom-full left-1/2 mb-3 flex -translate-x-1/2 gap-2 rounded-2xl border p-3 text-3xl shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              {entries.map(([i, e]) => {
                return (
                  <motion.button
                    className=""
                    key={i}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReaction(i)}
                  >
                    {e}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ReactionBar;
