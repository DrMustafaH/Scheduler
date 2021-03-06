import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days.map((day, i) => {
    return (
      <DayListItem
        key={i}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={(event) => props.setDay(day.name)}
      />
    );
  });
  return <ul>{days}</ul>;
}
