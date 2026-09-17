export type Item = {
  id: string;
  title: string;
};

const seedItems: Item[] = [
  { id: "item-alpha", title: "Alpha" },
  { id: "item-beta", title: "Beta" },
];

let items: Item[] = [...seedItems];

export function listItems(): Item[] {
  return items;
}

export function addItem(title: string): Item {
  const item: Item = {
    id: `item-${Date.now()}`,
    title: title.trim(),
  };
  items = [item, ...items];
  return item;
}
