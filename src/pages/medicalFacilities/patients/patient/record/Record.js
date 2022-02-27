import React, { useState } from 'react'
import 'styled-components/macro'
import { Colours, Notification } from 'components'
import {
  MedicalCondition,
  MedicalProblems,
  Vitals,
  Appointments,
  Medicines,
  Allergies,
  Diagnosis,
  Files,
  MedicalInsurance,
  Immunization,
  EmergencyContacts,
} from './sections'
import { useLocation } from 'react-router-dom'
import Fade from 'react-reveal/Fade'

import { CreateVital, EditVital, DeleteVital } from './subPages/vitals/modals'
import {
  CreateMedicine,
  EditMedicine,
  DeleteMedicine,
} from './subPages/medicines/modals'
import {
  CreateAllergy,
  EditAllergy,
  DeleteAllergy,
} from './subPages/allergies/modals'
import { CreateFile, ViewFile, DeleteFile } from './subPages/files/modals'
import {
  CreateInsurance,
  EditInsurance,
  DeleteInsurance,
} from './subPages/insurance/modals'
import {
  CreateDiagnosis,
  EditDiagnosis,
  DeletDiagnosis,
  ViewSymptoms,
} from './subPages/diagnosis/modals'
import {
  CreateEmergencyContact,
  RemoveEmergencyContact,
  UpdateEmergencyContact,
} from '../../modals'
import {
  CreateImmunization,
  EditImmunization,
  DeleteImmunization,
} from './subPages/immunizations/modals'
import { CancelAppointment } from '../../../appointment/createEvent/modal'

const queryString = require('query-string')

export default function Record() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const [completedVitalCreate, setcompletedVitalCreate] = useState(false)
  const [completedVitalEdit, setcompletedVitalEdit] = useState(false)

  const [completedMedicineCreate, setcompletedMedicineCreate] = useState(false)
  const [completedMedicineEdit, setcompletedMedicineEdit] = useState(false)

  const [completedAllergyCreate, setcompletedAllergyCreate] = useState(false)
  const [completedAllergyEdit, setcompletedAllergyEdit] = useState(false)

  const [completedDiagnosisCreate, setcompletedDiagnosisCreate] =
    useState(false)
  const [completedDiagnosisEdit, setcompletedDiagnosisEdit] = useState(false)

  const [completedFileCreate, setcompletedFileCreate] = useState(false)

  const [completedInsuranceCreate, setcompletedInsuranceCreate] =
    useState(false)
  const [completedInsuranceEdit, setcompletedInsuranceEdit] = useState(false)

  const [completedVaccineCreate, setcompletedVaccineCreate] = useState(false)
  const [completedVaccineEdit, setcompletedVaccineEdit] = useState(false)

  const [completedEmergencyCreate, setcompletedEmergencyCreate] =
    useState(false)

  const showNotificationVitalCreate = () => {
    setcompletedVitalCreate(true)
    setTimeout(() => {
      setcompletedVitalCreate(false)
    }, 6000)
  }
  const showNotificationVitalEdit = () => {
    setcompletedVitalEdit(true)
    setTimeout(() => {
      setcompletedVitalEdit(false)
    }, 6000)
  }

  const showNotificationMedicineCreate = () => {
    setcompletedMedicineCreate(true)
    setTimeout(() => {
      setcompletedMedicineCreate(false)
    }, 6000)
  }
  const showNotificationMedicineEdit = () => {
    setcompletedMedicineEdit(true)
    setTimeout(() => {
      setcompletedMedicineEdit(false)
    }, 6000)
  }

  const showNotificationAllergyCreate = () => {
    setcompletedAllergyCreate(true)
    setTimeout(() => {
      setcompletedAllergyCreate(false)
    }, 6000)
  }
  const showNotificationAllergyEdit = () => {
    setcompletedAllergyEdit(true)
    setTimeout(() => {
      setcompletedAllergyEdit(false)
    }, 6000)
  }

  const showNotificationDiagnosisCreate = () => {
    setcompletedDiagnosisCreate(true)
    setTimeout(() => {
      setcompletedDiagnosisCreate(false)
    }, 6000)
  }
  const showNotificationDiagnosisEdit = () => {
    setcompletedDiagnosisEdit(true)
    setTimeout(() => {
      setcompletedDiagnosisEdit(false)
    }, 6000)
  }

  const showNotificationFileCreate = () => {
    setcompletedFileCreate(true)
    setTimeout(() => {
      setcompletedFileCreate(false)
    }, 6000)
  }

  const showNotificationVaccineCreate = () => {
    setcompletedVaccineCreate(true)
    setTimeout(() => {
      setcompletedVaccineCreate(false)
    }, 6000)
  }
  const showNotificationVaccineEdit = () => {
    setcompletedVaccineEdit(true)
    setTimeout(() => {
      setcompletedVaccineEdit(false)
    }, 6000)
  }

  const showNotificationInsuranceCreate = () => {
    setcompletedInsuranceCreate(true)
    setTimeout(() => {
      setcompletedInsuranceCreate(false)
    }, 6000)
  }
  const showNotificationInsuranceEdit = () => {
    setcompletedInsuranceEdit(true)
    setTimeout(() => {
      setcompletedInsuranceEdit(false)
    }, 6000)
  }

  const showNotificationEmergencyCreate = () => {
    setcompletedEmergencyCreate(true)
    setTimeout(() => {
      setcompletedEmergencyCreate(false)
    }, 6000)
  }

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-gap: 20px;
        height: 100%;
        overflow-y: auto;
        /* Ipad */
        @media (max-width: 1024px) {
          grid-template-columns: 1fr;
        }
        @media only screen and (max-height: 769px) {
          @media only screen and (max-width: 1025px) {
            @media (orientation: landscape) {
              grid-template-columns: 1fr;
            }
          }
        }

        /* Ipod pro */
        @media (width: 1024px) {
          @media (height: 1366px) {
            @media (orientation: portrait) {
              grid-template-columns: 1fr;
            }
          }
        }
      `}
    >
      <Notification
        setcompleted={setcompletedVitalCreate}
        message="Vital Successfully added."
        notification={completedVitalCreate}
      />
      <Notification
        setcompleted={setcompletedVitalEdit}
        message="Vital Successfully updated."
        notification={completedVitalEdit}
      />

      <Notification
        setcompleted={setcompletedMedicineCreate}
        message="Medicine Successfully added."
        notification={completedMedicineCreate}
      />
      <Notification
        setcompleted={setcompletedMedicineEdit}
        message="Medicine Successfully updated."
        notification={completedMedicineEdit}
      />

      <Notification
        setcompleted={setcompletedAllergyCreate}
        message="Allergy Successfully added."
        notification={completedAllergyCreate}
      />
      <Notification
        setcompleted={setcompletedAllergyEdit}
        message="Allergy Successfully updated."
        notification={completedAllergyEdit}
      />

      <Notification
        setcompleted={setcompletedDiagnosisCreate}
        message="Diagnosis Successfully added."
        notification={completedDiagnosisCreate}
      />
      <Notification
        setcompleted={setcompletedDiagnosisEdit}
        message="Diagnosis Successfully updated."
        notification={completedDiagnosisEdit}
      />

      <Notification
        setcompleted={setcompletedFileCreate}
        message="File Successfully added."
        notification={completedFileCreate}
      />

      <Notification
        setcompleted={setcompletedVaccineCreate}
        message="Immunization/Vaccine Successfully added."
        notification={completedVaccineCreate}
      />
      <Notification
        setcompleted={setcompletedVaccineEdit}
        message="Immunization/Vaccine Successfully updated."
        notification={completedVaccineEdit}
      />

      <Notification
        setcompleted={setcompletedInsuranceCreate}
        message="Insurance Successfully added."
        notification={completedInsuranceCreate}
      />
      <Notification
        setcompleted={setcompletedInsuranceEdit}
        message="Insurance Successfully updated."
        notification={completedInsuranceEdit}
      />

      <Notification
        setcompleted={setcompletedEmergencyCreate}
        message="Emergency Contact Successfully added."
        notification={completedEmergencyCreate}
      />

      <div
        css={`
          border-top: 1px solid ${Colours.border};
          border-radius: 5px;
          overflow-x: hidden;
          overflow-y: auto;
          width: 100%;
          height: calc(100% - 1px);
          padding-bottom: 0;
          padding-right: 5px;
        `}
      >
        <Fade bottom>
          <Vitals />
        </Fade>
        <Fade bottom>
          <Medicines />
        </Fade>
        <Fade bottom>
          <Allergies />
        </Fade>
        <Fade bottom>
          <Diagnosis />
        </Fade>
        <Fade bottom>
          <Files />
        </Fade>
        <Fade bottom>
          <Immunization />
        </Fade>
        <Fade bottom>
          <MedicalInsurance />
        </Fade>
        <Fade bottom>
          <EmergencyContacts />
        </Fade>
        {action === 'addVital' && (
          <CreateVital
            showNotificationVitalCreate={showNotificationVitalCreate}
          />
        )}
        {action === 'editVital' && (
          <EditVital showNotificationVitalEdit={showNotificationVitalEdit} />
        )}
        {action === 'deleteVital' && <DeleteVital />}
        {action === 'addMedicine' && (
          <CreateMedicine
            showNotificationMedicineCreate={showNotificationMedicineCreate}
          />
        )}
        {action === 'editMedicine' && (
          <EditMedicine
            showNotificationMedicineEdit={showNotificationMedicineEdit}
          />
        )}
        {action === 'deleteMedicine' && <DeleteMedicine />}
        {action === 'addAllergy' && (
          <CreateAllergy
            showNotificationAllergyCreate={showNotificationAllergyCreate}
          />
        )}
        {action === 'editAllergy' && (
          <EditAllergy
            showNotificationAllergyEdit={showNotificationAllergyEdit}
          />
        )}
        {action === 'deleteAllergy' && <DeleteAllergy />}
        {action === 'addFile' && (
          <CreateFile showNotificationFileCreate={showNotificationFileCreate} />
        )}
        {action === 'viewFile' && <ViewFile />}
        {action === 'deleteFile' && <DeleteFile />}
        {action === 'addImmunization' && (
          <CreateImmunization
            showNotificationVaccineCreate={showNotificationVaccineCreate}
          />
        )}
        {action === 'editImmunization' && (
          <EditImmunization
            showNotificationVaccineEdit={showNotificationVaccineEdit}
          />
        )}
        {action === 'deleteImmunization' && <DeleteImmunization />}
        {action === 'addInsurance' && (
          <CreateInsurance
            showNotificationInsuranceCreate={showNotificationInsuranceCreate}
          />
        )}
        {action === 'editInsurance' && (
          <EditInsurance
            showNotificationInsuranceEdit={showNotificationInsuranceEdit}
          />
        )}
        {action === 'deleteInsurance' && <DeleteInsurance />}
        {action === 'addEmergencyContact' && (
          <CreateEmergencyContact
            showNotificationCreate={showNotificationEmergencyCreate}
          />
        )}
        {action === 'deleteEmergencyContact' && <RemoveEmergencyContact />}
        {action === 'updateEmergencyContact' && <UpdateEmergencyContact />}
        {action === 'addDiagnosis' && (
          <CreateDiagnosis
            showNotificationDiagnosisCreate={showNotificationDiagnosisCreate}
          />
        )}
        {action === 'editDiagnosis' && (
          <EditDiagnosis
            showNotificationDiagnosisEdit={showNotificationDiagnosisEdit}
          />
        )}
        {action === 'deleteDiagnosis' && <DeletDiagnosis />}
        {action === 'viewSymptoms' && <ViewSymptoms />}
        {action === 'cancelAppointment' && <CancelAppointment />}
      </div>
      {/* Right Side */}
      <div
        css={`
          border: 1px solid ${Colours.border};
          border-radius: 5px;
          padding: 10px;
          display: grid;
          grid-gap: 10px;
          grid-template-rows: 1fr 1fr max-content;
          height: calc(100% - 22px);
          overflow-y: auto;
          /* Ipad */
          @media (max-width: 1024px) {
            display: none;
          }
          @media only screen and (max-height: 769px) {
            @media only screen and (max-width: 1025px) {
              @media (orientation: landscape) {
                display: none;
              }
            }
          }

          /* Ipod pro */
          @media (width: 1024px) {
            @media (height: 1366px) {
              @media (orientation: portrait) {
                display: none;
              }
            }
          }
        `}
      >
        <Container>
          <MedicalCondition />
        </Container>
        <Container>
          <MedicalProblems />
        </Container>
        <Container>
          <Appointments />
        </Container>
      </div>
    </div>
  )
}

const Container = ({ children }) => (
  <div
    css={`
      width: 100%;
      border-radius: 5px;
      overflow-y: auto;
      height: 100%;
    `}
  >
    {children}
  </div>
)
