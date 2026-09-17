import { listItems } from "@/lib/example-items";
import { ItemInbox } from "./item-inbox";

export const dynamic = "force-dynamic";

export default function ExamplePage() {
  return <ItemInbox initialItems={listItems()} />;
}
