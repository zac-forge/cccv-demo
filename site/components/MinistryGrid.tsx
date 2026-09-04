import MinistryCard from "./MinistryCard";
import { MINISTRIES } from "@/lib/content";

/* The eight handbills on a twelve-column grid: wide ones take six, the
   rest three. Shared by the homepage and /ministries. */
export default function MinistryGrid({ reveal = false }: { reveal?: boolean }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
      {MINISTRIES.map((m) => (
        <li
          key={m.slug}
          data-reveal={reveal ? "" : undefined}
          className={m.wide ? "sm:col-span-2 lg:col-span-6" : "sm:col-span-1 lg:col-span-3"}
        >
          <MinistryCard ministry={m} />
        </li>
      ))}
    </ul>
  );
}
