import config from "@/config/config.json";
import languages from "@/config/language.json";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaGlobe } from "react-icons/fa6";

const LanguageSwitcher = ({
  lang,
  pathname,
}: {
  lang: string;
  pathname: string;
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const { default_language, default_language_in_subdir } = config.settings;

  // Function to remove trailing slash if necessary
  const removeTrailingSlash = (path: string) => {
    if (!config.site.trailing_slash) {
      return path.replace(/\/$/, "");
    }
    return path;
  };

  const pathMap: Record<string, Record<string, string>> = {
    "/strategie": {
      en: "/en/strategy",
    },
    "/en/strategy": {
      de: "/strategie",
    },
    // weitere Seiten hier eintragen
  };

  // Sort languages by weight and filter out disabled languages
  const sortedLanguages = languages
    .filter(
      (language: { languageCode: string }) =>
        // @ts-ignore
        !config.settings.disable_languages.includes(language.languageCode),
    )
    .sort(
      (a: { weight: number }, b: { weight: number }) => a.weight - b.weight,
    );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`mr-5 relative ${sortedLanguages.length > 1 ? "block" : "hidden"}`}
    >
      <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" />

      <select
        aria-label="Language Switcher"
        className="inline-block pl-9 pr-6 py-3.5 border border-text-gray focus:border-text-gray focus-visible:ring-transparent focus:outline-none rounded-[1.125rem] btn-outline-primary appearance-none cursor-pointer"
        onChange={(e) => {
          const selectedLang = e.target.value;
          const normalizedPath = removeTrailingSlash(pathname);
          const targetPath = pathMap[normalizedPath]?.[selectedLang];

          if (targetPath) {
            window.location.href = targetPath;
          } else {
            // fallback: bestehendes Verhalten
            let newPath;
            const baseUrl = window.location.origin;

            if (selectedLang === default_language) {
              if (default_language_in_subdir) {
                newPath = `${baseUrl}/${default_language}${removeTrailingSlash(pathname.replace(`/${lang}`, ""))}`;
              } else {
                newPath = `${baseUrl}${removeTrailingSlash(pathname.replace(`/${lang}`, ""))}`;
              }
            } else {
              newPath = `/${selectedLang}${removeTrailingSlash(pathname.replace(`/${lang}`, ""))}`;
            }

            window.location.href = newPath;
          }
        }}
        value={lang}
      >
        {sortedLanguages.map((language) => (
          <option
            key={language.languageCode}
            value={language.languageCode}
            className="bg-black text-white"
          >
            {isMobile ? language.languageName : capitalize(language.contentDir)}
          </option>
        ))}
      </select>
      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 pointer-events-none" />
    </div>
  );
};

export default LanguageSwitcher;