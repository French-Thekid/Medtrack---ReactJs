import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import { useQuery } from '@apollo/react-hooks'
import { LIST_DOCTORS } from './queries'
import { Colours, Core, Icons, Loading, Content, FormControl } from 'components'
import { UserContext } from 'context'

export default function DoctorsFilter({ Doctors, setDoctors }) {
  const { loggedInUser } = useContext(UserContext) || {}
  const { doctor = [] } = loggedInUser || {}
  const { id } = (doctor.length > 0 && doctor[0]) || {}

  const [show, setShow] = useState(false)

  //Query
  const { loading, error, data: doctors } = useQuery(LIST_DOCTORS)
  if (loading) return <Loading Contained />
  if (error)
    return <Content.Alert type="error" message={'Failed to load doctors'} />

  const doctorList = doctors.listDoctors.data.map(({ id, user }, index) => {
    const { firstName, lastName, person } = user || {}
    const { title } = person || {}
    return {
      name: `${title || ''} ${firstName} ${lastName}`,
      value: parseInt(id),
    }
  })

  let label = ''
  if (Doctors.doctors.length === 1) label = Doctors.doctors[0].name
  if (Doctors.doctors.length > 1) label = '2 or more doctors'

  return (
    <div
      css={`
        position: relative;
      `}
    >
      {show && (
        <Modal
          MyId={parseInt(id)}
          show={show}
          setShow={setShow}
          doctorList={doctorList}
          Doctors={Doctors}
          setDoctors={setDoctors}
        />
      )}
      <div
        css={`
          padding: 10px;
          width: max-content;
          display: grid;
          align-items: center;
          grid-template-columns: repeat(3, max-content);
          grid-gap: 10px;
          border-radius: 5px;
          margin-top: 5px;
          &:hover {
            cursor: pointer;
            background: ${Colours.menuHover};
          }
        `}
        onClick={() => setShow(!show)}
      >
        <Core.Text>Showing</Core.Text>
        <Core.Text color={Colours.purple}>{label} appointments</Core.Text>
        <Icons.ExpandMoreRoundedIcon style={{ color: Colours.purple }} />
      </div>
    </div>
  )
}

const Modal = ({ show, setShow, doctorList, MyId, Doctors, setDoctors }) => {
  let override = false
  Doctors.doctors.map(({ name }, index) => {
    if (name === 'All') override = true
    return null
  })

  return (
    <div
      css={`
        backdrop-filter: blur(10px) saturate(180%);
        -webkit-backdrop-filter: blur(10px) saturate(180%);
        background-color: rgba(255, 255, 255, 0.78);
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        border: 1px solid rgba(209, 213, 219, 0.3);
        max-height: 500px;
        min-width: 300px;
        position: absolute;
        bottom: 0;
        z-index: 100;
        margin-bottom: 40px;
        margin-left: 80px;
        display: grid;
        grid-template-rows: max-content 1fr max-content;
        grid-gap: 10px;
        overflow-y: auto;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr max-content;
          padding: 10px 10px 5px 10px;
          border-bottom: 1px solid ${Colours.border};
          align-items: center;
        `}
      >
        <Core.Text color={Colours.purple}>Appointment Filter</Core.Text>
        <section
          css={`
            color: ${Colours.icon};
            transition: ease-out 0.2s;
            &:hover {
              cursor: pointer;
              color: ${Colours.purple};
              transition: ease-out 0.2s;
              transform: translateY(-1px);
            }
          `}
          onClick={() => setShow(!show)}
        >
          <Icons.CloseRoundedIcon style={{ color: 'inherit' }} />
        </section>
      </div>
      <div
        css={`
          overflow-y: auto;
        `}
      >
        <Row
          name={'All'}
          value={''}
          Doctors={Doctors}
          setDoctors={setDoctors}
          MyId={MyId}
        />
        {!override &&
          doctorList.map(({ name, value }, index) => {
            return (
              <Row
                key={index}
                name={name}
                value={value}
                Doctors={Doctors}
                setDoctors={setDoctors}
                MyId={MyId}
              />
            )
          })}
      </div>
    </div>
  )
}

const Row = ({ name, value, Doctors, MyId, setDoctors }) => {
  let flag = false
  Doctors.doctors.map(({ value: innerValue }, index) => {
    if (innerValue === value) flag = true
    return null
  })

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 1fr max-content;
        grid-gap: 40px;
        padding: 10px;
        &:hover {
          background: ${Colours.menuHover};
        }
      `}
    >
      <Core.Text>{name}</Core.Text>
      <FormControl.Toggle
        startwithoff={!flag}
        onChange={(e) => {
          const checked = e.target.checked
          if (checked) {
            if (name === 'All') {
              setDoctors((state) => {
                const doctors = [{ name, value }]
                return {
                  doctors,
                }
              })
            } else {
              setDoctors((state) => {
                const doctors = state.doctors.concat({
                  name: value === MyId ? 'My' : name,
                  value,
                })
                return {
                  doctors,
                }
              })
            }
          } else {
            setDoctors((state) => {
              const doctors = state.doctors.filter(
                (item, j) => item.value !== value
              )
              return {
                doctors,
              }
            })
          }
        }}
      />
    </div>
  )
}
