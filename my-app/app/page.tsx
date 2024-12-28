import {
  GridBackgroundHero,
  ProjectOne,
  ProjectThree,
  ProjectTwo,
} from "../components/ui/grid-background";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <GridBackgroundHero />
      <ProjectOne />
      <ProjectTwo />
      <ProjectThree />
    </div>
  );
}
