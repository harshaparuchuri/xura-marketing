import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";
import { Duotone } from "@/components/graphics/duotone";

/**
 * Journal — a rotated outlined badge on the left, an article list on the right.
 * Each row is a small duotone thumbnail plus title, category and read time,
 * separated by hairlines.
 *
 * PLACEHOLDER CONTENT: replace these with real posts, or drop the section until
 * the journal exists.
 */
type Post = {
  title: string;
  category: string;
  minutes: string;
  art: "sky" | "landscape" | "portrait";
};

const POSTS: Post[] = [
  {
    title: "How to build a decision-ready data stack",
    category: "Insights",
    minutes: "4 min",
    art: "sky",
  },
  {
    title: "Analytics isn't a side project: making insight operational",
    category: "Strategy",
    minutes: "7 min",
    art: "landscape",
  },
  {
    title: "Inside the Xura model: how we turn data into action",
    category: "Insights",
    minutes: "5 min",
    art: "portrait",
  },
];

export const Journal = () => (
  <section id="journal" className="bg-background py-16 md:py-20">
    <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      {/* Rotated outline badge */}
      <Inview
        mode="once"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 175, friction: 28 }}
        className="hidden lg:block"
      >
        <div
          aria-hidden
          className="w-fit -rotate-[8deg] skew-x-[-12deg] border border-duo px-8 py-5"
        >
          <p className="skew-x-[12deg] text-lg font-medium tracking-tight text-duo">
            Xura Journal
          </p>
        </div>
      </Inview>

      <div>
        <Inview
          tag="h2"
          mode="once"
          from={{ opacity: 0, y: 18 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="display-sans"
        >
          From the journal
        </Inview>

        <ul className="mt-7">
          {POSTS.map((post, i) => (
            <Inview
              key={post.title}
              tag="li"
              mode="once"
              delayIn={i * 80}
              from={{ opacity: 0, y: 16 }}
              to={{ opacity: 1, y: 0 }}
              config={{ tension: 180, friction: 27 }}
              className="border-t border-line first:border-t-0"
            >
              <Link
                href="#"
                className="group flex items-center gap-5 py-4 transition-opacity duration-[var(--duration-fast)] ease-entrance hover:opacity-70"
              >
                <Duotone
                  variant={post.art}
                  className="h-14 w-20 shrink-0 rounded-[2px]"
                />
                <span>
                  <span className="block text-sm font-medium">
                    {post.title}
                  </span>
                  <span className="meta mt-1 block">
                    {post.category} · {post.minutes}
                  </span>
                </span>
              </Link>
            </Inview>
          ))}
        </ul>

        <Inview
          mode="once"
          delayIn={260}
          from={{ opacity: 0, y: 14 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 180, friction: 27 }}
          className="mt-7 flex justify-center lg:justify-start"
        >
          <Link href="#" className="pill">
            View all articles
          </Link>
        </Inview>
      </div>
    </div>
  </section>
);
