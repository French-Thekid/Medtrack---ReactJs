import { gql } from 'apollo-boost'

export const ATTACH_NOTE = gql`
  mutation attachNote($note: NoteCreateInput!) {
    attachNote(note: $note) {
      id
    }
  }
`
export const UPDATE_NOTE = gql`
  mutation updateNote($note: NoteUpdateInput!) {
    updateNote(note: $note) {
      id
    }
  }
`
export const DELETE_NOTE = gql`
  mutation deleteNote($id: [Int]!) {
    deleteNote(id: $id) {
      message
    }
  }
`
