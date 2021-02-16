import React from "react";
import classNames from 'classnames';

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const InterviewerListItemClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected,
  })

  return (
    <li className={InterviewerListItemClass}
      onClick={() => props.setInterviewer(props.name)}
    >
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
  Sylvia Palmer
    </li>
  )
}