import { useMemo } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, MapPin, Clock } from "lucide-react";
import QRCode from "react-qr-code";

type SocialPlatform = "github" | "linkedin" | "twitter" | "mail";

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  platform: SocialPlatform;
  href: string;
}

const BRAND = {
  name: "Islam Hafez",
  tagline: "Frontend Developer | Odoo Developer",
};

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contributions", href: "#contributions" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS: SocialLink[] = [
  { platform: "github", href: "https://github.com/islamhafez0" },
  { platform: "linkedin", href: "https://linkedin.com/in/islamhafez0" },
  { platform: "twitter", href: "https://x.com/islamhafez07" },
  { platform: "mail", href: "mailto:islamhafez806@gmail.com" },
];

const CONTACT = {
  email: "islamhafez806@gmail.com",
  location: "Egypt",
  availability: "Available for opportunities",
  phone: "+20 10 9742 3297",
};

const iconMap: Record<SocialPlatform, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      className="bg-gray-900 border-t border-gray-800"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            aria-label="Brand and social"
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-600/20 flex items-center justify-center ring-1 ring-inset ring-indigo-500/30">
                <span className="text-sm font-bold text-indigo-400">IH</span>
              </div>
              <div className="min-w-0">
                <p className="text-base md:text-lg font-semibold text-white tracking-tight">
                  {BRAND.name}
                </p>
                <p className="text-sm text-gray-400 mt-1">{BRAND.tagline}</p>
              </div>
            </div>

            <ul className="flex flex-wrap items-center gap-2.5">
              {SOCIAL_LINKS.map((s, idx) => {
                const Icon = iconMap[s.platform];
                const isExternal =
                  !s.href.startsWith("#") && !s.href.startsWith("mailto:");
                return (
                  <li key={`${s.platform}-${idx}`}>
                    <a
                      href={s.href}
                      aria-label={`Visit ${s.platform}`}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800/60 hover:bg-gray-800 ring-1 ring-inset ring-gray-700/60 hover:ring-gray-600 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <Icon
                        className="h-[18px] w-[18px] text-gray-400 group-hover:text-indigo-400 transition-colors"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.section>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            aria-label="Quick links"
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Quick links
            </h3>
            <ul className="grid grid-cols-2 gap-2.5">
              {NAV_LINKS.map((item, idx) => (
                <li key={`${item.label}-${idx}`}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 rounded-md px-1 py-1 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-gray-700 group-hover:bg-indigo-500 transition-colors"
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            aria-label="Contact details"
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800/60 ring-1 ring-inset ring-gray-700/60">
                  <Mail className="h-4 w-4 text-gray-400" />
                </span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-4"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800/60 ring-1 ring-inset ring-gray-700/60">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </span>
                <span className="text-gray-400">{CONTACT.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800/60 ring-1 ring-inset ring-gray-700/60">
                  <Clock className="h-4 w-4 text-gray-400" />
                </span>
                <span className="text-gray-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  {CONTACT.availability}
                </span>
              </li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            aria-label="Connect via QR"
            className="flex flex-col gap-4"
          >
            <div className="bg-white p-3 rounded-xl md:w-fit group hover:scale-105 transition-transform duration-300">
              <QRCode
                value={`BEGIN:VCARD
VERSION:3.0
FN:${BRAND.name}
TITLE:${BRAND.tagline}
EMAIL:${CONTACT.email}
TEL:${CONTACT.phone}
URL:${window.location.origin}
END:VCARD`}
                size={130}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
              />
            </div>
            <p className="text-xs text-gray-500">Scan to save contact info</p>
          </motion.section>
        </div>

        <div className="my-8 h-px bg-gray-800" />

        <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-gray-400">
            © {year} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
