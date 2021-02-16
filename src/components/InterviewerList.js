import React from "react";

import InterviewerListItem from "./InterviewerListItem"


export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer, index) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={index === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}