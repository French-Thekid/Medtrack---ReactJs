import React, { useState } from 'react'
import 'styled-components/macro'
import { Form, Colours, FormControl, Core, Loading, Content } from 'components'
import { useRouteMatch } from 'react-router-dom'
import { LIST_DIAGNOSIS } from '../queries'
import { CREATE_DIAGNOSIS } from '../mutations'
import { useMutation } from '@apollo/react-hooks'

export default function CreatePrescription({
  close,
  showNotificationFileCreate,
}) {
  const [stepcontrol, setStepControl] = useState([])
  const [name, setName] = useState('')
  const [status, setStatus] = useState(true)
  const [description, setDescription] = useState('')
  const [symptom1, setsymptom1] = useState({
    name: '',
    description: '',
  })
  const [symptom2, setsymptom2] = useState({
    name: '',
    description: '',
  })
  const {
    params: { patientId },
  } = useRouteMatch()

  //Mutation
  const [createDiagnosis, { loading, error }] = useMutation(CREATE_DIAGNOSIS, {
    refetchQueries: () => [
      {
        query: LIST_DIAGNOSIS,
        variables: { patientId: parseInt(patientId) },
      },
    ],
    onCompleted(createDiagnosis) {
      showNotificationFileCreate()
    },
  })

  const HandleSubmission = async (event) => {
    event.preventDefault()

    let symptoms = []

    if (symptom1.name !== '') {
      symptoms.push({
        name: symptom1.name,
        description: symptom1.description,
      })
    }
    if (symptom2.name !== '') {
      symptoms.push({
        name: symptom2.name,
        description: symptom2.description,
      })
    }

    Destuctive(stepcontrol).map(({ name, description }, index) => {
      symptoms.push({
        name,
        description,
      })
      return null
    })

    await createDiagnosis({
      variables: {
        diagnosis: {
          patientId: parseInt(patientId),
          name: name,
          description: description,
          symptoms: symptoms,
          status: status === true ? 'Active' : 'Past',
        },
      },
    }).catch((e) => console.log(e))
    close()
  }

  return (
    <Form.StepForm handleSubmit={(event) => HandleSubmission(event)}>
      <Form.Step>
        <Core.Text>
          Please enter the symptoms for the diagnosis below.
        </Core.Text>
        <br />
        <Item
          name={symptom1.name}
          description={symptom1.description}
          index={1}
          controller={setsymptom1}
          uniqueKey={'Aa'}
          main
        />
        <br />
        <Item
          name={symptom2.name}
          description={symptom2.description}
          index={2}
          controller={setsymptom2}
          uniqueKey={'Bb'}
          main
        />
        <div
          css={`
            width: 100%;
            display: grid;
            justify-items: end;
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={() =>
            setStepControl((prevState) => {
              return prevState.concat({
                name1: '',
                description1: '',
                name2: '',
                description2: '',
                id: stepcontrol.length,
              })
            })
          }
        >
          <Core.Text color={Colours.purple}>
            + Add More symptoms In Next Step
          </Core.Text>
        </div>
      </Form.Step>
      {stepcontrol.map(
        ({ name1, description1, name2, description2, id }, index) => {
          return (
            <div key={index}>
              <Form.Step>
                <div
                  css={`
                    width: 100%;
                    display: grid;
                    justify-items: end;
                    &:hover {
                      cursor: pointer;
                    }
                  `}
                  onClick={() =>
                    setStepControl((prevState) =>
                      prevState.filter((item, j) => item.id !== id)
                    )
                  }
                >
                  <Core.Text color={Colours.red}>- Remove this step</Core.Text>
                </div>
                <Item
                  name={name1}
                  description={description1}
                  index={
                    id === 0
                      ? id + 3
                      : id === 1
                      ? id + 4
                      : id === 2
                      ? id + 5
                      : id + 6
                  }
                  uniqueKey={index}
                  controller={setStepControl}
                  id={id}
                  first
                />
                <br />
                <Item
                  name={name2}
                  description={description2}
                  index={
                    id === 0
                      ? id + 4
                      : id === 1
                      ? id + 5
                      : id === 2
                      ? id + 6
                      : id + 7
                  }
                  uniqueKey={index + 1}
                  controller={setStepControl}
                  id={id}
                  second
                />
                <div
                  css={`
                    width: 100%;
                    display: grid;
                    justify-items: end;
                    &:hover {
                      cursor: pointer;
                    }
                  `}
                  onClick={() =>
                    setStepControl((prevState) => {
                      return prevState.concat({
                        name1: '',
                        description1: '',
                        name2: '',
                        description2: '',
                        id: stepcontrol.length,
                      })
                    })
                  }
                >
                  <Core.Text color={Colours.purple}>
                    + Add More symptoms In Next Step
                  </Core.Text>
                </div>
              </Form.Step>
            </div>
          )
        }
      )}
      <Form.Step>
        {loading && <Loading />}
        {error && (
          <Content.Alert type="error" message="Fail to add diagnosis" />
        )}
        <Core.Text>
          Please enter the Name and Description for this diagnosis below.
        </Core.Text>
        <br />
        <div
          css={`
            display: grid;
            justify-items: end;
            width: 100%;
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-columns: max-content max-content;
              grid-gap: 5px;
              align-items: center;
            `}
          >
            <Core.Text>Active Diagnosis</Core.Text>
            <FormControl.Toggle
              value={status}
              onChange={(e) => setStatus(e.target.checked)}
              id="status"
              name="status"
            />
          </div>
        </div>
        <FormControl.Section>
          <FormControl.Input
            label="Diagnosis Name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Diagnosis Name"
            data-testid="create-bill-name"
          />
        </FormControl.Section>
        <div
          css={`
            height: 10px;
          `}
        />
        <FormControl.Section>
          <FormControl.Input
            label="Diagnosis  Description"
            id="description"
            type="text"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Diagnosis  Description"
            data-testid="create-bill-description"
            error={name !== '' && description === ''}
          />
        </FormControl.Section>
      </Form.Step>
    </Form.StepForm>
  )
}

function Item({
  name,
  controller,
  description,
  index = 1,
  uniqueKey,
  main,
  id,
  first,
  second,
}) {
  const handleChange = (e, type) => {
    if (main) {
      switch (type) {
        case 'name':
          controller((prevState) => {
            return {
              name: e.target.value,
              description: prevState.description,
            }
          })
          break
        case 'description':
          controller((prevState) => {
            return {
              name: prevState.name,
              description: e.target.value,
            }
          })
          break
        default:
          console.log('Default')
          break
      }
    } else {
      switch (type) {
        case 'name':
          controller((prevState) => {
            return prevState.map((item, index) => {
              if (item.id === id) {
                if (first) {
                  return {
                    name1: e.target.value,
                    description1: item.description1,
                    name2: item.name2,
                    description2: item.description2,
                    id: item.id,
                  }
                } else if (second) {
                  return {
                    name1: item.name1,
                    description1: item.description1,
                    name2: e.target.value,
                    description2: item.description2,
                    id: item.id,
                  }
                }
              }
              return item
            })
          })
          break
        case 'description':
          controller((prevState) => {
            return prevState.map((item, index) => {
              if (item.id === id) {
                if (first) {
                  return {
                    name1: item.name1,
                    description1: e.target.value,
                    name2: item.name2,
                    description2: item.description2,
                    id: item.id,
                  }
                } else if (second) {
                  return {
                    name1: item.name1,
                    description1: item.description1,
                    name2: item.name2,
                    description2: e.target.value,
                    id: item.id,
                  }
                }
              }
              return item
            })
          })
          break
        default:
          console.log('Default')
          break
      }
    }
  }
  return (
    <FormControl.FieldSet>
      <FormControl.Legend>{`Symptom ${index}`}</FormControl.Legend>

      <FormControl.Section>
        <FormControl.Input
          label="Name"
          id={`ItemName${uniqueKey}`}
          type="text"
          value={name}
          onChange={(e) => handleChange(e, 'name')}
          placeholder="Name"
          error={description !== '' && name === ''}
        />
      </FormControl.Section>

      <FormControl.Input
        label="Description"
        id={`SymptomDescription${uniqueKey}`}
        type="text"
        value={description}
        onChange={(e) => handleChange(e, 'description')}
        multiline
        rows={2}
        placeholder="Description"
      />
    </FormControl.FieldSet>
  )
}

const Destuctive = (array) => {
  let sumptoms1 = array
    .map((item, index) => {
      if (item.name1 !== '') {
        return {
          name: item.name1,
          description: item.description1,
        }
      }
      return null
    })
    .filter((item, index) => item !== null)

  let symptoms2 = array
    .map((item, index) => {
      if (item.name2 !== '') {
        return {
          name: item.name2,
          description: item.description2,
        }
      }
      return null
    })
    .filter((item, index) => item !== null)

  const finalArray = sumptoms1.concat(symptoms2)
  return finalArray
}
