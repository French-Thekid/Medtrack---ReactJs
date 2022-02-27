import React, { useState } from 'react'
import 'styled-components/macro'
import { LIST_PERMISSIONS, READ_ROLES } from './queries'
import { UPDATE_ROLE_PERMISSIONS } from './mutations'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Layout, Core, Content, Loading, Colours } from 'components'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { CollapsibleComponent } from './Permissions'

export default function ManagePermissions() {
  const history = useHistory()
  const {
    params: { roleId },
  } = useRouteMatch()
  const existingData = localStorage.getItem('existingIds') || []
  let readyData = []
  if (existingData !== undefined && existingData !== null)
    readyData = JSON.parse(existingData)

  const [selectedPermissions, setSelectedPermissions] = useState({
    permissions: readyData || [],
  })
  const [list, setList] = useState([0])
  //Mutations
  const [
    updateRolePermissions,
    { loading: loading1, error: addPermissionsToRoleError },
  ] = useMutation(UPDATE_ROLE_PERMISSIONS, {
    refetchQueries: () => [
      {
        query: READ_ROLES,
        variables: { id: parseInt(roleId) },
      },
    ],
    onCompleted() {
      history.push(`/facility/settings/roles/permissions/${roleId}`)
      localStorage.removeItem('existingIds')
    },
  })

  //Query
  const { loading, error, data: permissions } = useQuery(LIST_PERMISSIONS)
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Failed to load permissions'} />

  //Algorithm below converts backend data into usable data
  const entities = permissions.listPermissions.data.map(
    ({ id, entity, action }, index) => {
      let object = JSON.stringify({ feature: entity, action: action })
      return { object, id }
    }
  )
  let grouping = []
  for (let i = 0; i < entities.length; i++) {
    grouping.push({
      object: entities[i].object,
      ids: entities
        .map((item, j) => {
          if (entities[i].object === entities[j].object) return entities[j].id
          return null
        })
        .filter((item, index) => item !== null),
    })
  }
  const temp = grouping.map((item, index) => JSON.stringify(item))
  let filteredList = temp.filter((c, index) => {
    return temp.indexOf(c) === index
  })
  const temp1 = filteredList.map((item, index) => JSON.parse(item))

  const temp2 = temp1.map(({ object, ids }, index) => {
    const entity = JSON.parse(object)
    return { feature: entity.feature, action: entity.action, ids }
  })

  let finalGrouping = []
  for (let i = 0; i < temp2.length; i++) {
    finalGrouping.push({
      feature: temp2[i].feature,
      actions: temp2
        .map((item, j) => {
          if (temp2[i].feature === temp2[j].feature)
            return { action: temp2[j].action, ids: temp2[j].ids }
          return null
        })
        .filter((item, index) => item !== null),
    })
  }
  const temp3 = finalGrouping.map((item, index) => JSON.stringify(item))
  let filteredList1 = temp3.filter((c, index) => {
    return temp3.indexOf(c) === index
  })
  const finalList = filteredList1.map((item, index) => JSON.parse(item))

  const handleSubmission = async () => {
    const a1 = selectedPermissions.permissions.map((a, index) => JSON.parse(a))
    var merged = [].concat.apply([], a1)
    let permissionIds = [...new Set(merged)]
    await updateRolePermissions({
      variables: {
        params: {
          roleId: parseInt(roleId),
          permissionIds: permissionIds,
        },
      },
    }).catch((e) => {
      console.log(e)
    })
  }

  const handleRemoval = (index) => {
    console.log({ index })
    setList((state) => {
      return state.filter((item, j) => item !== index)
    })
  }


  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 20px;
      `}
    >
      <Layout.TopPanel
        title={`Add Permissions`}
        to={`/facility/settings/roles/permissions/${roleId}`}
      >
        <Core.Button
          bgColour={Colours.green}
          purpose="major"
          onClick={() => {
            handleSubmission()
          }}
        >
          Update
        </Core.Button>
      </Layout.TopPanel>
      {loading1 && <Loading small />}
      {addPermissionsToRoleError && (
        <Content.Alert
          type="error"
          message={'Failed to update role permissions'}
        />
      )}
      <div
        css={`
          overflow-y: auto;
          display: grid;
          grid-template-rows: 1fr max-content;
          grid-gap: 10px;
        `}
      >
        <div
          css={`
            overflow-y: auto;
          `}
        >
          {/***
           * TODO
           * optimise to map after MVP
           */}
          {list.includes(0) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(0)}
            />
          )}
          {list.includes(1) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(1)}
            />
          )}
          {list.includes(2) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(2)}
            />
          )}
          {list.includes(3) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(3)}
            />
          )}
          {list.includes(4) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(4)}
            />
          )}
          {list.includes(5) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(5)}
            />
          )}
          {list.includes(6) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(6)}
            />
          )}
          {list.includes(7) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(7)}
            />
          )}
          {list.includes(8) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(8)}
            />
          )}
          {list.includes(9) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(9)}
            />
          )}
          {list.includes(10) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(10)}
            />
          )}
          {list.includes(11) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(11)}
            />
          )}
          {list.includes(12) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(12)}
            />
          )}
          {list.includes(13) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(13)}
            />
          )}
          {list.includes(14) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(14)}
            />
          )}
          {list.includes(15) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(15)}
            />
          )}
          {list.includes(16) === true && (
            <CollapsibleComponent
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={setSelectedPermissions}
              data={finalList}
              bottom
              handleRemoval={() => handleRemoval(16)}
            />
          )}
        </div>
        <div
          css={`
            display: grid;
            justify-items: end;
            border-top: 1px solid ${Colours.border};
            padding: 5px 0px;
          `}
        >
          <Core.Button
            width="150px"
            onClick={() => setList((state) => state.concat(list.length))}
          >
            Add More
          </Core.Button>
        </div>
      </div>
    </div>
  )
}
