import React from 'react'
import 'styled-components/macro'
import {
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer/dist/react-pdf.es.js'
import { splitArrayIntoChunksOfLen } from './Users'

// Create styles
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    height: 25,
    justifyContent: 'start',
    alignContent: 'center',
    backgroundColor: '#fdf8ff',
    marginBottom: 10,
  },
  Title: {
    fontSize: 13,
    color: '#6f42ff',
    marginTop: 6,
    marginLeft: 250,
  },
  title: {
    fontSize: 12,
    color: '#00bad2',
    marginBottom: 10,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderColor: '#e1d8fe',
  },
  title1: {
    fontSize: 9,
    color: '#463188',
    marginBottom: 10,
    paddingBottom: 3,
  },
  titleNumbers: {
    fontSize: 9,
    color: '#6f42ff',
    marginBottom: 10,
    paddingBottom: 3,
    marginLeft: 30,
  },
  title2: {
    fontSize: 12,
    color: '#463188',
    marginBottom: 10,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderColor: '#e1d8fe',
  },
  header: {
    borderBottomWidth: 1,
    borderColor: '#d1cae8',
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 3,
  },

  subContainer: {
    marginBottom: 30,
  },
  group: {
    flexDirection: 'row',
    alignContent: 'start',
  },
  group1: {
    flexDirection: 'row',
    width: '100%',
  },
  group2: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 20,
  },
  margin: {
    marginBottom: 20,
  },
  left: {
    width: 278,
    flexDirection: 'column',
    alignContent: 'start',
  },
  right: {
    width: 278,
    flexDirection: 'column',
    alignContent: 'start',
  },
  Tleft: {
    width: 530,
    flexDirection: 'column',
    alignContent: 'start',
  },
  Tright: {
    flexDirection: 'column',
    alignContent: 'start',
  },
  one: {
    width: 185.33,
    flexDirection: 'column',
    alignContent: 'start',
  },
  two: {
    width: 185.33,
    flexDirection: 'column',
    alignContent: 'start',
  },
  three: {
    width: 185.33,
    flexDirection: 'column',
    alignContent: 'start',
  },
  onee: {
    width: 180,
    flexDirection: 'column',
    alignContent: 'start',
  },
  twwo: {
    width: 300,
    flexDirection: 'column',
    alignContent: 'start',
  },
  threee: {
    width: 65,
    flexDirection: 'column',
    alignContent: 'start',
  },
  title3: {
    fontSize: 10,
    color: '#463188',
  },
  groupHeader: {
    flexDirection: 'row',
    alignContent: 'start',
    backgroundColor: '#f9f9fb',
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
})

export default function Roles({ detail, roleData, roles }) {
  let total = 0
  let active = 0
  let inActive = 0

  roleData.map((role, index) => {
    if (role.name !== 'Supreme Administrator')
      if (role.activeUserCount > 0) active++
      else inActive++

    return null
  })

  const Raw = roleData
    .map((role, index) => {
      if (role.name !== 'Supreme Administrator') {
        total++
        return role
      }
      return null
    })
    .filter((item, index) => item !== null)

  const Actives = roleData
    .map((role, index) => {
      if (role.name !== 'Supreme Administrator')
        if (role.activeUserCount > 0) return role
      return null
    })
    .filter((item, index) => item !== null)

  const InActives = roleData
    .map((role, index) => {
      if (role.name !== 'Supreme Administrator')
        if (role.activeUserCount === 0) return role
      return null
    })
    .filter((item, index) => item !== null)

  const Basic = () => {
    return (
      <View style={styles.group}>
        <View style={styles.left}>
          <View>
            {roles === 'All' && (
              <>
                <Text style={styles.title}>Total Roles</Text>
                <Text style={styles.title}>Total Active Roles</Text>
                <Text style={styles.title}>Total Inactive Roles</Text>
              </>
            )}
            {roles === 'Active Roles' && (
              <>
                <Text style={styles.title}>Total Active Roles</Text>
              </>
            )}
            {roles === 'Inactive Roles' && (
              <>
                <Text style={styles.title}>Total Inactive Roles</Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.right}>
          <View>
            {roles === 'All' && (
              <>
                <Text style={styles.title2}>{total}</Text>
                <Text style={styles.title2}>{active}</Text>
                <Text style={styles.title2}>{inActive}</Text>
              </>
            )}
            {roles === 'Active Roles' && (
              <>
                <Text style={styles.title2}>{active}</Text>
              </>
            )}
            {roles === 'Inactive Roles' && (
              <>
                <Text style={styles.title2}>{inActive}</Text>
              </>
            )}
          </View>
        </View>
      </View>
    )
  }
  const Intermediate = () => {
    let space = ['one', 'two', 'three']
    let group = splitArrayIntoChunksOfLen(Raw, 3)
    let activeGroup = splitArrayIntoChunksOfLen(Actives, 3)
    let inActiveGroup = splitArrayIntoChunksOfLen(InActives, 3)

    return roles === 'All' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Roles</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{total}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {group.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((role, index) => (
                <View style={styles[space[index]]}>
                  <Text style={styles.title1}>{role.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Active Roles</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{active}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {activeGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((role, index) => (
                <View style={styles[space[index]]}>
                  <Text style={styles.title1}>{role.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Inactive Roles</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActive}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {inActiveGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((role, index) => (
                <View style={styles[space[index]]}>
                  <Text style={styles.title1}>{role.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </>
    ) : roles === 'Active Roles' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Active Roles</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{active}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {activeGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((role, index) => (
                <View style={styles[space[index]]}>
                  <Text style={styles.title1}>{role.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </>
    ) : roles === 'Inactive Roles' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Inactive Roles</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActive}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {inActiveGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((role, index) => (
                <View style={styles[space[index]]}>
                  <Text style={styles.title1}>{role.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </>
    ) : null
  }

  const ExtremelyDetails = () => {
    return roles === 'All' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Roles</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{total}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['onee']}>
            <Text style={styles.title3}>Name</Text>
          </View>
          <View style={styles['twwo']}>
            <Text style={styles.title3}>Description</Text>
          </View>
          <View style={styles['threee']}>
            <Text style={styles.title3}>Users Assign</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {roleData.map((role, index) => {
            if (role.name !== 'Supreme Administrator')
              return (
                <View style={styles.group} key={index}>
                  <View style={styles['onee']}>
                    <Text style={styles.title1}>{role.name}</Text>
                  </View>
                  <View style={styles['twwo']}>
                    <Text style={styles.title1}>{role.description}</Text>
                  </View>
                  <View style={styles['threee']}>
                    <Text style={styles.titleNumbers}>
                      {role.activeUserCount}
                    </Text>
                  </View>
                </View>
              )
            return null
          })}
        </View>

        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Active Roles</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{active}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['onee']}>
            <Text style={styles.title3}>Name</Text>
          </View>
          <View style={styles['twwo']}>
            <Text style={styles.title3}>Description</Text>
          </View>
          <View style={styles['threee']}>
            <Text style={styles.title3}>Users Assign</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {roleData.map((role, index) => {
            if (role.name !== 'Supreme Administrator')
              if (role.activeUserCount > 0)
                return (
                  <View style={styles.group} key={index}>
                    <View style={styles['onee']}>
                      <Text style={styles.title1}>{role.name}</Text>
                    </View>
                    <View style={styles['twwo']}>
                      <Text style={styles.title1}>{role.description}</Text>
                    </View>
                    <View style={styles['threee']}>
                      <Text style={styles.titleNumbers}>
                        {role.activeUserCount}
                      </Text>
                    </View>
                  </View>
                )
            return null
          })}
        </View>

        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Inactive Roles</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActive}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['onee']}>
            <Text style={styles.title3}>Name</Text>
          </View>
          <View style={styles['twwo']}>
            <Text style={styles.title3}>Description</Text>
          </View>
          <View style={styles['threee']}>
            <Text style={styles.title3}>Users Assign</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {roleData.map((role, index) => {
            if (role.name !== 'Supreme Administrator')
              if (role.activeUserCount === 0)
                return (
                  <View style={styles.group} key={index}>
                    <View style={styles['onee']}>
                      <Text style={styles.title1}>{role.name}</Text>
                    </View>
                    <View style={styles['twwo']}>
                      <Text style={styles.title1}>{role.description}</Text>
                    </View>
                    <View style={styles['threee']}>
                      <Text style={styles.titleNumbers}>
                        {role.activeUserCount}
                      </Text>
                    </View>
                  </View>
                )
            return null
          })}
        </View>
      </>
    ) : roles === 'Active Roles' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Active Roles</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{active}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['onee']}>
            <Text style={styles.title3}>Name</Text>
          </View>
          <View style={styles['twwo']}>
            <Text style={styles.title3}>Description</Text>
          </View>
          <View style={styles['threee']}>
            <Text style={styles.title3}>Users Assign</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {roleData.map((role, index) => {
            if (role.name !== 'Supreme Administrator')
              if (role.activeUserCount > 0)
                return (
                  <View style={styles.group} key={index}>
                    <View style={styles['onee']}>
                      <Text style={styles.title1}>{role.name}</Text>
                    </View>
                    <View style={styles['twwo']}>
                      <Text style={styles.title1}>{role.description}</Text>
                    </View>
                    <View style={styles['threee']}>
                      <Text style={styles.titleNumbers}>
                        {role.activeUserCount}
                      </Text>
                    </View>
                  </View>
                )
            return null
          })}
        </View>
      </>
    ) : roles === 'All' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Inactive Roles</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActive}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['onee']}>
            <Text style={styles.title3}>Name</Text>
          </View>
          <View style={styles['twwo']}>
            <Text style={styles.title3}>Description</Text>
          </View>
          <View style={styles['threee']}>
            <Text style={styles.title3}>Users Assign</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {roleData.map((role, index) => {
            if (role.name !== 'Supreme Administrator')
              if (role.activeUserCount === 0)
                return (
                  <View style={styles.group} key={index}>
                    <View style={styles['onee']}>
                      <Text style={styles.title1}>{role.name}</Text>
                    </View>
                    <View style={styles['twwo']}>
                      <Text style={styles.title1}>{role.description}</Text>
                    </View>
                    <View style={styles['threee']}>
                      <Text style={styles.titleNumbers}>
                        {role.activeUserCount}
                      </Text>
                    </View>
                  </View>
                )
            return null
          })}
        </View>
      </>
    ) : null
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.Title}>Roles</Text>
      </View>
      {detail === 1 && <Basic />}
      {detail === 2 && <Intermediate />}
      {detail === 3 && <ExtremelyDetails />}
    </View>
  )
}
