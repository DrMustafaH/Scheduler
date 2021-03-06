import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const value = props.spots;
  function formatSpots() {
    return value === 0
      ? `no spots remaining`
      : value === 1
      ? `${value} spot remaining`
      : `${value} spots remaining`;
  }

  const DayListItemClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li data-testid="day" className={DayListItemClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
