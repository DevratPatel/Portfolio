import Footer from "@/components/footer";
import {
  GridBackgroundHero,
  ProjectOne,
  ProjectThree,
  ProjectTwo,
} from "../components/ui/grid-background";

export default function Home() {
  return (
    <div className="h-screen w-screen mx-auto overflow-x-hidden">
      <GridBackgroundHero />
      <ProjectOne />
      <ProjectTwo />
      <ProjectThree />
      <Footer />
    </div>
  );
}
