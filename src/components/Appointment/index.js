import React from "react";

import "components/Appointment/style.scss"
import { useVisualMode } from "../../hooks/useVisualMode"

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, type) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview, type).then(() => {
      transition(SHOW)
    })
      .catch(() => {
        transition(ERROR_SAVE, true);
      })
  }

  function deleteAppointment(id, interview) {
    transition(DELETING, true)
    props.cancelInterview(props.id, interview).then(() => {
      transition(EMPTY)
    })
      .catch(() => {
        transition(ERROR_DELETE, true);
      })
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => { transition(CONFIRM) }}
          onEdit={() => { transition(EDIT) }}
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
      {mode === EDIT && <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onSave={(name, interviewer) => save(name, interviewer, 'edit')}
        onCancel={() => { transition(SHOW) }}
      />}
      {mode === ERROR_DELETE && <Error
        message="Could not delete appointment."
        onClose={() => { transition(CONFIRM) }}
      />}
      {mode === ERROR_SAVE && <Error
        message="Could not save appointment."
        onClose={() => { transition(EDIT) }}
      />}
    </article>
  )
}