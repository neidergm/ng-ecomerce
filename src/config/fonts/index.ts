import localFont from "next/font/local";
import { Montserrat_Alternates } from "next/font/google";

export const geistSans = localFont({
    src: "./GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

export const geistMono = localFont({
    src: "./GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const titleFont = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ["500", "700"]
})