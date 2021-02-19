import React from "react";

import "components/Appointment/style.scss"
import { useVisualMode } from "../../hooks/useVisualMode"

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW)
    })
  }

  function deleteAppointment(id, interview) {
    transition(DELETING)
    props.cancelInterview(props.id, interview).then(() => {
      transition(EMPTY)
    })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => { transition(CONFIRM) }}
        />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={() => { back() }}
        onSave={save}
      />}
      {mode === SAVING && <Status
        message="Saving"
      />}
      {mode === DELETING && <Status
        message="Deleting"
      />}
      {mode === CONFIRM && <Confirm
        message="Delete the appointment?"
        onConfirm={deleteAppointment}
        onCancel={() => { transition(SHOW) }}
      />}
    </article>
  )
}