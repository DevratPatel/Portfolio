import { GridBackground, GridBackgroundHero } from "./layout";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <GridBackgroundHero />
      <GridBackground />
    </div>
  );
}
