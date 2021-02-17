import React, { useState } from "react";

import Button from "components/Button"
import InterviewerList from "components/InterviewerList"

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function handleCancel() {
    props.onCancel();
    reset();
  }

  function handleSave() {
    props.onSave(name, interviewer);
    setName(name);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange={event => setName(event.target.value)}
            name="name"
            type="text"
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(id) => {
            setInterviewer(id)
          }}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={handleCancel}>Cancel</Button>
          <Button confirm onClick={handleSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}