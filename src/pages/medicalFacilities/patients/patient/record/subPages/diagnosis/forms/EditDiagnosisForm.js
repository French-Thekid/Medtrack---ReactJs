import React, { useState } from 'react'
import 'styled-components/macro'
import { Form, Colours, FormControl, Core, Loading, Content } from 'components'
import { useRouteMatch } from 'react-router-dom'
import { LIST_DIAGNOSIS } from '../queries'
import { UPDATE_DIAGNOSIS } from '../mutations'
import { useMutation } from '@apollo/react-hooks'

export default function EditDiagnosis({
  close,
  showNotificationDiagnosisEdit,
}) {
  const {
    name: initialName,
    description: initialDescription,
    status: initialStatus,
    symptoms,
    diagnosisId,
  } = JSON.parse(localStorage.getItem('selectedDiagnosis')) || {}
  const {
    params: { patientId },
  } = useRouteMatch()

  const [status, setStatus] = useState(initialStatus)
  let [stepcontrol, setStepControl] = useState(
    symptoms.map((symptom, index) => {
      return {
        name1: symptom.name,
        description1: symptom.description,
        id: index,
      }
    })
  )

  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription)

  //Mutation
  const [updateDiagnosis, { loading, error }] = useMutation(UPDATE_DIAGNOSIS, {
    refetchQueries: () => [
      {
        query: LIST_DIAGNOSIS,
        variables: { patientId: parseInt(patientId) },
      },
    ],
    onCompleted(updateDiagnosis) {
      showNotificationDiagnosisEdit()
    },
  })

  const HandleSubmission = async (event) => {
    event.preventDefault()

    let symptoms = []

    Destuctive(stepcontrol).map(({ name, description }, index) => {
      symptoms.push({
        name,
        description,
      })
      return null
    })

    const updateList = symptoms.filter(
      (item, index) => JSON.stringify(item) !== JSON.stringify({})
    )

    await updateDiagnosis({
      variables: {
        diagnosis: {
          id: parseInt(diagnosisId),
          name: name,
          description: description,
          symptoms: updateList,
          status: status === true ? 'Active' : 'Past',
        },
      },
    }).catch((e) => console.log(e))
    close()
  }

  return (
    <Form.StepForm handleSubmit={(event) => HandleSubmission(event)}>
      {stepcontrol.map(({ name1, description1, id }, index) => {
        return (
          <div key={index}>
            <Form.Step>
              <Core.Text>
                Please enter the symptoms for the diagnosis below.
              </Core.Text>
              <br />
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
                index={id + 1}
                uniqueKey={index}
                controller={setStepControl}
                id={id}
                first
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
                  + Add More Symptoms In Next Step
                </Core.Text>
              </div>
            </Form.Step>
          </div>
        )
      })}
      <Form.Step>
        {loading && <Loading />}
        {error && (
          <Content.Alert type="error" message="Fail to update diagnosis" />
        )}
        <Core.Text>
          Please update the Name and Description for this diagnosis below.
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
              startwithoff={status === false}
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

        {stepcontrol.length === 0 && (
          <div
            css={`
              width: 100%;
              display: grid;
              justify-items: start;
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
              + Add Symptoms In Previous Step
            </Core.Text>
          </div>
        )}
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
      <br />
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
