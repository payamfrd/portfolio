// // "use client";

// // import { FaSearch } from "react-icons/fa";

// // export default function SearchBox({ value, onChange, placeholder }) {
// //   return (
// //     <div className="relative mt-8 max-w-xl mx-auto">
// //       <FaSearch
// //         className="
// //           absolute
// //           left-4
// //           top-1/2
// //           -translate-y-1/2
// //           text-[var(--muted)]
// //         "
// //       />

// //       <input
// //         type="text"
// //         value={value}
// //         onChange={(e) => onChange(e.target.value)}
// //         placeholder={placeholder}
// //         className="
// //           w-full
// //          px-6
// //          py-2

// //           rounded-2xl

// //           border
// //           border-[var(--border)]

// //           bg-[var(--card)]

// //           outline-none

// //           focus:border-[var(--accent)]

// //           transition
// //         "
// //       />
// //     </div>
// //   );
// // }

// "use client";

// import { useParams } from "next/navigation";
// import { FaSearch } from "react-icons/fa";

// export default function SearchBox({
//   value,
//   onChange,
//   placeholder,
// }) {
//   const params = useParams();

//   const isPersian = params?.locale === "fa";

//   return (
//     <div
//       className="relative mx-auto w-full max-w-2xl"
//       dir={isPersian ? "rtl" : "ltr"}
//     >
//       <FaSearch
//         aria-hidden="true"
//         className={`
//           pointer-events-none
//           absolute
//           top-1/2
//           -translate-y-1/2
//           text-[var(--muted)]
//           ${
//             isPersian
//               ? "right-4"
//               : "left-4"
//           }
//         `}
//         size={16}
//       />

//       <input
//         type="search"
//         value={value}
//         onChange={(event) => onChange(event.target.value)}
//         placeholder={placeholder}
//         aria-label={placeholder}
//         className={`
//           w-full
//           rounded-2xl
//           border
//           border-[var(--border)]
//           bg-[var(--card)]
//           py-3.5
//           text-sm
//           text-[var(--text)]
//           outline-none
//           transition-all
//           duration-300
//           placeholder:text-[var(--muted)]
//           focus:border-[var(--primary)]
//           focus:ring-2
//           focus:ring-[var(--primary)]/20
//           ${
//             isPersian
//               ? "pr-12 pl-4 text-right"
//               : "pl-12 pr-4 text-left"
//           }
//         `}
//       />
//     </div>
//   );
// }

"use client";

import { useParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchBox({ value = "", onChange, placeholder = "" }) {
  const params = useParams();

  const isPersian = params?.locale === "fa";

  return (
    <div
      className="relative mx-auto w-full max-w-2xl"
      dir={isPersian ? "rtl" : "ltr"}
    >
      <FaSearch
        aria-hidden="true"
        size={16}
        className={`
          pointer-events-none
          absolute
          top-1/2
          -translate-y-1/2
          text-[var(--muted)]
          ${isPersian ? "right-4" : "left-4"}
        `}
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        spellCheck={false}
        className={`
          w-full
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--card)]
          py-3.5
          text-sm
          text-[var(--text)]
          outline-none
          transition-all
          duration-300
          placeholder:text-[var(--muted)]
          focus:border-[var(--primary)]
          focus:ring-2
          focus:ring-[var(--primary)]/20
          ${isPersian ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left"}
        `}
      />
    </div>
  );
}
