import React, { useState } from "react";

import Button from "components/Button"
import InterviewerList from "components/InterviewerList"


// Form component logic
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");


  // function to handle error if student input is submitted blank
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    // setName(name)
    props.onSave(name, interviewer);
  }
  

  // function to reset student input area and interviewr
  function reset() {
    setName("");
    setInterviewer(null);
  }


// when cancel button is clicked onCancel function is fired and reset function is called
  function handleCancel() {
    props.onCancel();
    reset();
  }


  // when save button is clicked onSave function is fired
  // function handleSave() {
  //   props.onSave(name, interviewer);
  //   setName(name);
  // }


// return of the form component
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"
          />
        <section className="appointment__validation">{error}</section>
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
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}