import { Chat } from "@/components/custom/chat";
import IntakeForm from "@/components/custom/intake-form";
import { generateUUID } from "@/lib/utils";

export default async function Page() {
  const id = generateUUID();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Top TRUMPS</h1>
      <IntakeForm />
    </div>
  );
}
