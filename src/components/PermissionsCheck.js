import { useContext } from 'react'
import { UserContext } from 'context'

export default function PermissionCheck({ feature, action }) {
  const { loggedInUser } = useContext(UserContext)
  const { role } = loggedInUser || {}
  const { permissions = [] } = role || {}

  // console.log(`Checking if user has permission to ${action} ${feature}`)

  //Algorithm below converts backend data into usable data
  const entities = permissions.map(({ id, entity, action }, index) => {
    let object = JSON.stringify({ feature: entity, action: action })
    return { object, id }
  })
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

  let grantAccess = false

  finalList.map((item, index) => {
    if (item.feature === feature)
      item.actions.map((item, index) => {
        if (item.action === action) grantAccess = true
        return null
      })
    return null
  })

  return grantAccess
}
