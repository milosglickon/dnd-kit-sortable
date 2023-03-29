import React, { useState } from "react";
import { findIndex } from "lodash";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";

const questions = [
  { type: 0, en: "", it: "" },
  { type: 0, en: "", it: "" },
  { type: 0, en: "", it: "" },
];

type PropsType = {
  questions: { type: number; en: string; it: "" }[];
};

const data = questions.map((q, index) => ({ ...q, id: index + 1 }));
export default () => {
  const [items, setItems] = useState(data);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    console.log("active----->", active);
    console.log("over----->", over);

    if (active.id !== over.id) {
      const oldItem = items.find((item) => item.id === active.id);
      const newItem = items.find((item) => item.id === over.id);
      //@ts-ignore
      const oldIndex = findIndex(items, (item) => item.id === oldItem.id);
      //@ts-ignore
      const newIndex = findIndex(items, (item) => item.id === newItem.id);
      setItems((items) => {
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  console.log("items----->", items);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            <div
              style={{
                border: "1px solid gray",
                borderRadius: "0.5rem",
                width: "20rem",
                height: "3rem",
                marginTop: "3px",
                cursor: "pointer",
              }}
            >{`item-${item.id}`}</div>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};
