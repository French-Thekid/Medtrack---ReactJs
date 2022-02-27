import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { FormControl, Core, Form, Content, Loading, Colours } from 'components'
import {
  createAdminReportSchema,
  initialAdminReport,
  userTypes,
  roleTypes,
  marks,
} from './initialValues'
import { Slider } from '@material-ui/core'
import { MyDocument } from '../PDFSections'
import { LIST_USERS } from 'pages/settings/users/queries'
import { LIST_ROLES } from 'pages/settings/roles/queries'
import { PDFViewer } from '@react-pdf/renderer'
import { useQuery } from '@apollo/react-hooks'
import { pdf } from '@react-pdf/renderer'
import tickLogo from 'assets/tick.png'
import { LIST_REPORT } from '../queries'
import { CREATE_REPORT } from '../mutations'
import { useMutation } from '@apollo/react-hooks'

export default function AdminReportForm({ close, showNotification }) {
  const [createReport, { loading: exLoading, error: exError }] = useMutation(
    CREATE_REPORT,
    {
      refetchQueries: () => [
        {
          query: LIST_REPORT,
        },
      ],
      onCompleted() {
        showNotification()
        close()
      },
    }
  )

  //Query
  const { loading, error, data: users } = useQuery(LIST_USERS)
  const { loading: loading1, error: error1, data: roles } = useQuery(LIST_ROLES)
  if (loading || loading1) return <Loading small />
  if (error || error1)
    return (
      <Content.Alert type="error" message={'Failed to load required data'} />
    )
  const userData = users.listUsers.data
  const roleData = roles.listRoles.data

  return (
    <Formik
      initialValues={initialAdminReport}
      validationSchema={createAdminReportSchema}
      onSubmit={async ({ title, users, roles, detail }, actions) => {
        var reader = new FileReader()
        const doc = (
          <MyDocument
            userData={userData}
            roleData={roleData}
            users={users}
            roles={roles}
            title={title}
            detail={detail}
          />
        )
        const asPdf = pdf([])
        asPdf.updateContainer(doc)
        const blob = await asPdf.toBlob()
        reader.readAsDataURL(blob)
        reader.onloadend = async function () {
          var pdf = reader.result
          await createReport({
            variables: {
              report: { fileName: title, base64Pdf: pdf.split(',')[1] },
            },
          }).catch((e) => console.log(e))
        }
        reader.error = () => console.log('Error')
        reader.onerror = () => console.log('Error')
      }}
    >
      {(props) => {
        const {
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
        } = props
        let { users, title, roles, detail } = values
        return (
          <Form.StepForm {...props} customSubmit={'Save'}>
            <Form.Step>
              <FormControl.Section>
                <FormControl.Input
                  label="Title for Report"
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Title for Report"
                  data-testid="create-Patient-title"
                  error={errors.title && touched.title}
                />
                <FormControl.Error
                  name="title"
                  show={errors.title && touched.title}
                  message={errors.title}
                />
              </FormControl.Section>
              <FormControl.ResponsiveSection>
                <FormControl.Section marginTop="15px">
                  <FormControl.Select
                    value={users}
                    groups={userTypes}
                    label="User"
                    name="users"
                    handlechange={handleChange}
                    handleblur={handleBlur}
                    error={errors.users && touched.users}
                  />
                  <FormControl.Error
                    name="users"
                    show={errors.users && touched.users}
                    message={errors.users}
                  />
                </FormControl.Section>
                <FormControl.Section marginTop="15px">
                  <FormControl.Select
                    value={roles}
                    groups={roleTypes}
                    label="Roles"
                    name="roles"
                    handlechange={handleChange}
                    handleblur={handleBlur}
                    error={errors.roles && touched.roles}
                  />
                  <FormControl.Error
                    name="roles"
                    show={errors.roles && touched.roles}
                    message={errors.roles}
                  />
                </FormControl.Section>
              </FormControl.ResponsiveSection>

              <div
                css={`
                  display: grid;
                  grid-template-rows: max-content max-content;

                  margin-top: 15px;
                `}
              >
                <Core.Text>Level Of Detail</Core.Text>
                <div
                  css={`
                    padding: 15px;
                    width: 465px;
                    background: #fdf8ff;
                    border-radius: 5px;
                  `}
                >
                  <Slider
                    name="detail"
                    id="detail"
                    min={1}
                    max={3}
                    step={1}
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    value={detail}
                    onChange={(event, newValue) => {
                      setFieldValue('detail', newValue)
                    }}
                    marks={marks}
                    track={false}
                  />
                </div>
                <FormControl.Error
                  name="detail"
                  show={errors.detail}
                  message={errors.detail}
                />
              </div>
            </Form.Step>
            <Form.Step>
              <div
                css={`
                  width: 550px;
                  height: 400px;
                `}
              >
                <PDFViewer
                  css={`
                    height: calc(100% - 2px);
                    width: calc(100% - 2px);
                    border-radius: 5px;
                    border: 1px solid ${Colours.border};
                  `}
                >
                  <MyDocument
                    userData={userData}
                    roleData={roleData}
                    users={users}
                    roles={roles}
                    title={title}
                    detail={detail}
                  />
                </PDFViewer>
              </div>
            </Form.Step>
            <Form.Step>
              {exLoading && <Loading />}
              {exError && (
                <Content.Alert type="error" message="Fail to save report" />
              )}
              <div
                css={`
                  display: grid;
                  width: 100%;
                  place-items: center;
                  margin-bottom: 20px;
                `}
              >
                <img
                  src={tickLogo}
                  alt="tick"
                  css={`
                    height: 60px;
                    width: 70px;
                  `}
                />
                <br />
                <Core.Text>Your all set, please Save</Core.Text>
                <br />
              </div>
            </Form.Step>
          </Form.StepForm>
        )
      }}
    </Formik>
  )
}
