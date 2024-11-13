import Image from "next/image";
import { FloatingNavDemo } from "./navbar-test";
import Footer from "@/components/footer";
import { div } from "framer-motion/client";

export default function Home() {
  return (
    <div>
      <FloatingNavDemo />
      <Footer />
    </div>
  );
}
