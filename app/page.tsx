import { Dashboard } from "@/components/home/dashboard/Dashboard";
import Hero from "@/components/home/hero/Hero";
import { InsightFlow } from "@/components/home/insightFlow/InsightFlow";
import Signature from "@/components/home/signature/Signature";

export default function Home() {
  return (
    <div>
      <Hero/>
      <InsightFlow/>
      <Dashboard/>
      <Signature/>
    </div>
  );
}
