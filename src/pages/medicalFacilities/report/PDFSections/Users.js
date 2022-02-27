import React from 'react'
import 'styled-components/macro'
import {
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer/dist/react-pdf.es.js'

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
  title2: {
    fontSize: 12,
    color: '#463188',
    marginBottom: 10,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderColor: '#e1d8fe',
  },
  title3: {
    fontSize: 10,
    color: '#463188',
  },
  header: {
    borderBottomWidth: 1,
    borderColor: '#d1cae8',
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 3,
  },
  groupHeader: {
    flexDirection: 'row',
    alignContent: 'start',
    backgroundColor: '#f9f9fb',
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
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
})

export default function Users({ detail, userData, users }) {
  const total = userData.length
  let totalDoctors = 0
  let totalSecretary = 0
  let active = 0
  let activeDoctors = 0
  let activeSecretary = 0
  let inActive = 0
  let inActiveDoctors = 0
  let inActiveSecretary = 0
  let suspended = 0
  let doctorsSuspended = 0
  let secretarySuspended = 0
  let doctors = 0
  let secretaries = 0

  userData.map((user, index) => {
    let { name } = user.userStatus || {}
    if (name === 'Disassociated' || name === 'Suspended') {
      suspended++
    } else {
      active++
    }

    if (user.enabled === 0) inActive++
    if (user.type === 'Doctor') {
      doctors++
      totalDoctors++
      if (name === 'Disassociated' || name === 'Suspended') {
        inActiveDoctors++
      } else {
        activeDoctors++
      }
    }
    if (user.type === 'Secretary') {
      secretaries++
      totalSecretary++
      if (name === 'Disassociated' || name === 'Suspended') {
        inActiveSecretary++
      } else {
        activeSecretary++
      }
    }

    return null
  })

  const Doctors = userData
    .map((user, index) => {
      if (user.type === 'Doctor') return user
      return null
    })
    .filter((item, index) => item !== null)

  const Secretaries = userData
    .map((user, index) => {
      if (user.type === 'Secretary') return user
      return null
    })
    .filter((item, index) => item !== null)

  const Basic = () => (
    <View style={styles.group}>
      <View style={styles.left}>
        <View>
          {users === 'All' && (
            <>
              <Text style={styles.title}>Total Users</Text>
              <Text style={styles.title}>Total Active Users</Text>
              <Text style={styles.title}>Total Inactive Users</Text>
              <Text style={styles.title}>Total Users Suspended</Text>
              <Text style={styles.title}>Total Doctors</Text>
              <Text style={styles.title}>Total Secretary</Text>
            </>
          )}
          {users === 'Doctors' && (
            <>
              <Text style={styles.title}>Total Doctors</Text>
              <Text style={styles.title}>Total Active Doctors</Text>
              <Text style={styles.title}>Total Inactive Doctors</Text>
              <Text style={styles.title}>Total Doctors Disassociated</Text>
            </>
          )}
          {users === 'Secretaries' && (
            <>
              <Text style={styles.title}>Total Secretaties</Text>
              <Text style={styles.title}>Total Active Secretaties</Text>
              <Text style={styles.title}>Total Inactive Secretaties</Text>
              <Text style={styles.title}>Total Secretaties Disabled</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.right}>
        <View>
          {users === 'All' && (
            <>
              <Text style={styles.title2}>{total}</Text>
              <Text style={styles.title2}>{active}</Text>
              <Text style={styles.title2}>{inActive}</Text>
              <Text style={styles.title2}>{suspended}</Text>
              <Text style={styles.title2}>{doctors}</Text>
              <Text style={styles.title2}>{secretaries}</Text>
            </>
          )}
          {users === 'Doctors' && (
            <>
              <Text style={styles.title2}>{totalDoctors}</Text>
              <Text style={styles.title2}>{activeDoctors}</Text>
              <Text style={styles.title2}>{inActiveDoctors}</Text>
              <Text style={styles.title2}>{inActiveDoctors}</Text>
            </>
          )}
          {users === 'Secretaries' && (
            <>
              <Text style={styles.title2}>{totalSecretary}</Text>
              <Text style={styles.title2}>{activeSecretary}</Text>
              <Text style={styles.title2}>{inActiveSecretary}</Text>
              <Text style={styles.title2}>{inActiveSecretary}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  )

  const Intermediate = () => {
    let space = ['one', 'two', 'three']
    let group = splitArrayIntoChunksOfLen(userData, 3)
    let doctorGroup = splitArrayIntoChunksOfLen(Doctors, 3)
    let secretaryGroup = splitArrayIntoChunksOfLen(Secretaries, 3)

    return users === 'All' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Users</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{total}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {group.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => (
                <View style={styles[space[index]]}>
                  <Text
                    style={styles.title1}
                  >{`${user.firstName} ${user.lastName}`}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Active Users</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{active}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {group.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => {
                let { name } = user.userStatus || {}
                if (name === 'Disassociated' || name === 'Suspended') {
                } else {
                  return (
                    <View style={styles[space[index]]}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                  )
                }
                return null
              })}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Inactive Users</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActive}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {group.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => {
                if (user.enabled === 0)
                  return (
                    <View style={styles[space[index]]}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                  )
                return null
              })}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Users Suspended</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{suspended}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {group.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => {
                let { name } = user.userStatus || {}
                if (name === 'Disassociated' || name === 'Suspended') {
                  return (
                    <View style={styles[space[index]]}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                  )
                }
                return null
              })}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Doctors</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{doctors}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {doctorGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => {
                if (user.type === 'Doctor')
                  return (
                    <View style={styles[space[index]]}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                  )
                return null
              })}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Secretary</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{secretaries}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {secretaryGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => {
                if (user.type === 'Secretary')
                  return (
                    <View style={styles[space[index]]}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                  )
                return null
              })}
            </View>
          ))}
        </View>
      </>
    ) : users === 'Doctors' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Doctors</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{totalDoctors}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {doctorGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => (
                <View style={styles[space[index]]}>
                  <Text
                    style={styles.title1}
                  >{`${user.firstName} ${user.lastName}`}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Active Doctors</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{activeDoctors}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {doctorGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => {
                let { name } = user.userStatus || {}
                if (name === 'Disassociated' || name === 'Suspended') {
                } else {
                  return (
                    <View style={styles[space[index]]}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                  )
                }
                return null
              })}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Inactive Doctors</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActiveDoctors}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {doctorGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => {
                if (user.enabled === 0)
                  return (
                    <View style={styles[space[index]]}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                  )
                return null
              })}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Doctors Disassociated</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{doctorsSuspended}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {doctorGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => {
                let { name } = user.userStatus || {}
                if (name === 'Disassociated' || name === 'Suspended') {
                  return (
                    <View style={styles[space[index]]}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                  )
                }
                return null
              })}
            </View>
          ))}
        </View>
      </>
    ) : users === 'Secretaries' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Secretaties</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{totalSecretary}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {secretaryGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => (
                <View style={styles[space[index]]}>
                  <Text
                    style={styles.title1}
                  >{`${user.firstName} ${user.lastName}`}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Active Secretaties</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{activeSecretary}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {secretaryGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => {
                let { name } = user.userStatus || {}
                if (name === 'Disassociated' || name === 'Suspended') {
                } else {
                  return (
                    <View style={styles[space[index]]}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                  )
                }
                return null
              })}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Inactive Secretaties</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActiveSecretary}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {secretaryGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => {
                if (user.enabled === 0)
                  return (
                    <View style={styles[space[index]]}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                  )
                return null
              })}
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Secretaties Disabled</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{secretarySuspended}</Text>
          </View>
        </View>
        <View style={styles.margin}>
          {secretaryGroup.map((subGroup, index) => (
            <View style={styles.group}>
              {subGroup.map((user, index) => {
                let { name } = user.userStatus || {}
                if (name === 'Disassociated' || name === 'Suspended') {
                  return (
                    <View style={styles[space[index]]}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                  )
                }
                return null
              })}
            </View>
          ))}
        </View>
      </>
    ) : null
  }

  const ExtremelyDetails = () => {
    return users === 'All' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Users</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{total}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>User Type</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
        </View>

        <View style={styles.group2}>
          {userData.map((user, index) => (
            <View style={styles.group} key={index}>
              <View style={styles['one']}>
                <Text
                  style={styles.title1}
                >{`${user.firstName} ${user.lastName}`}</Text>
              </View>
              <View style={styles['two']}>
                <Text style={styles.title1}>{user.type}</Text>
              </View>
              <View style={styles['three']}>
                <Text style={styles.title1}>{user.email}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Active Users</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{active}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>User Type</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
        </View>

        <View style={styles.group2}>
          {userData.map((user, index) => {
            let { name } = user.userStatus || {}
            if (name === 'Disassociated' || name === 'Suspended') {
            } else {
              return (
                <View style={styles.group} key={index}>
                  <View style={styles['one']}>
                    <Text
                      style={styles.title1}
                    >{`${user.firstName} ${user.lastName}`}</Text>
                  </View>
                  <View style={styles['two']}>
                    <Text style={styles.title1}>{user.type}</Text>
                  </View>
                  <View style={styles['three']}>
                    <Text style={styles.title1}>{user.email}</Text>
                  </View>
                </View>
              )
            }
            return null
          })}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Inactive Users</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActive}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>User Type</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
        </View>

        <View style={styles.group2}>
          {userData.map((user, index) => {
            if (user.enabled === 0)
              return (
                <View style={styles.group} key={index}>
                  <View style={styles['one']}>
                    <Text
                      style={styles.title1}
                    >{`${user.firstName} ${user.lastName}`}</Text>
                  </View>
                  <View style={styles['two']}>
                    <Text style={styles.title1}>{user.type}</Text>
                  </View>
                  <View style={styles['three']}>
                    <Text style={styles.title1}>{user.email}</Text>
                  </View>
                </View>
              )

            return null
          })}
        </View>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Users Suspended</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{suspended}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>User Type</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
        </View>

        <View style={styles.group2}>
          {userData.map((user, index) => {
            let { name } = user.userStatus || {}
            if (name === 'Disassociated' || name === 'Suspended')
              return (
                <View style={styles.group} key={index}>
                  <View style={styles['one']}>
                    <Text
                      style={styles.title1}
                    >{`${user.firstName} ${user.lastName}`}</Text>
                  </View>
                  <View style={styles['two']}>
                    <Text style={styles.title1}>{user.type}</Text>
                  </View>
                  <View style={styles['three']}>
                    <Text style={styles.title1}>{user.email}</Text>
                  </View>
                </View>
              )

            return null
          })}
        </View>

        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Doctors</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{doctors}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>User Type</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {userData.map((user, index) => {
            if (user.type === 'Doctor')
              return (
                <View style={styles.group} key={index}>
                  <View style={styles['one']}>
                    <Text
                      style={styles.title1}
                    >{`${user.firstName} ${user.lastName}`}</Text>
                  </View>
                  <View style={styles['two']}>
                    <Text style={styles.title1}>{user.type}</Text>
                  </View>
                  <View style={styles['three']}>
                    <Text style={styles.title1}>{user.email}</Text>
                  </View>
                </View>
              )

            return null
          })}
        </View>

        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Secretary</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{secretaries}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>User Type</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {userData.map((user, index) => {
            if (user.type === 'Secretary')
              return (
                <View style={styles.group} key={index}>
                  <View style={styles['one']}>
                    <Text
                      style={styles.title1}
                    >{`${user.firstName} ${user.lastName}`}</Text>
                  </View>
                  <View style={styles['two']}>
                    <Text style={styles.title1}>{user.type}</Text>
                  </View>
                  <View style={styles['three']}>
                    <Text style={styles.title1}>{user.email}</Text>
                  </View>
                </View>
              )

            return null
          })}
        </View>
      </>
    ) : users === 'Doctors' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Doctors</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{totalDoctors}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Role Assigned</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {userData.map((user, index) => {
            const { role } = user || {}
            const { name } = role || {}

            if (user.type === 'Doctor')
              return (
                <View style={styles.group} key={index}>
                  <View style={styles['one']}>
                    <Text
                      style={styles.title1}
                    >{`${user.firstName} ${user.lastName}`}</Text>
                  </View>
                  <View style={styles['two']}>
                    <Text style={styles.title1}>{user.email}</Text>
                  </View>
                  <View style={styles['three']}>
                    <Text style={styles.title1}>{name || 'None Assigned'}</Text>
                  </View>
                </View>
              )

            return null
          })}
        </View>

        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Active Doctors</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{activeDoctors}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Role Assigned</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {userData.map((user, index) => {
            const { role } = user || {}
            const { name: roleName } = role || {}

            if (user.type === 'Doctor') {
              let { name } = user.userStatus || {}
              if (name === 'Disassociated' || name === 'Suspended') {
              } else {
                return (
                  <View style={styles.group} key={index}>
                    <View style={styles['one']}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                    <View style={styles['two']}>
                      <Text style={styles.title1}>{user.email}</Text>
                    </View>
                    <View style={styles['three']}>
                      <Text style={styles.title1}>
                        {roleName || 'None Assigned'}
                      </Text>
                    </View>
                  </View>
                )
              }
              return null
            }
            return null
          })}
        </View>

        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Inactive Doctors</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActiveDoctors}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Role Assigned</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {userData.map((user, index) => {
            const { role } = user || {}
            const { name: roleName } = role || {}
            if (user.type === 'Doctor') {
              let { name } = user.userStatus || {}
              if (name === 'Disassociated' || name === 'Suspended') {
                return (
                  <View style={styles.group} key={index}>
                    <View style={styles['one']}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                    <View style={styles['two']}>
                      <Text style={styles.title1}>{user.email}</Text>
                    </View>
                    <View style={styles['three']}>
                      <Text style={styles.title1}>
                        {roleName || 'None Assigned'}
                      </Text>
                    </View>
                  </View>
                )
              }
              return null
            }
            return null
          })}
        </View>

        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Doctors Disassociated</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActiveDoctors}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Role Assigned</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {userData.map((user, index) => {
            const { role } = user || {}
            const { name: roleName } = role || {}

            if (user.type === 'Doctor') {
              let { name } = user.userStatus || {}
              if (name === 'Disassociated' || name === 'Suspended') {
                return (
                  <View style={styles.group} key={index}>
                    <View style={styles['one']}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                    <View style={styles['two']}>
                      <Text style={styles.title1}>{user.email}</Text>
                    </View>
                    <View style={styles['three']}>
                      <Text style={styles.title1}>
                        {roleName || 'None Assigned'}
                      </Text>
                    </View>
                  </View>
                )
              }
              return null
            }
            return null
          })}
        </View>
      </>
    ) : users === 'Secretaries' ? (
      <>
        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Secretaties</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{totalSecretary}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Role Assigned</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {userData.map((user, index) => {
            const { role } = user || {}
            const { name } = role || {}

            if (user.type === 'Secretary')
              return (
                <View style={styles.group} key={index}>
                  <View style={styles['one']}>
                    <Text
                      style={styles.title1}
                    >{`${user.firstName} ${user.lastName}`}</Text>
                  </View>
                  <View style={styles['two']}>
                    <Text style={styles.title1}>{user.email}</Text>
                  </View>
                  <View style={styles['three']}>
                    <Text style={styles.title1}>{name || 'None Assigned'}</Text>
                  </View>
                </View>
              )

            return null
          })}
        </View>

        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Active Secretaties</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{activeSecretary}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Role Assigned</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {userData.map((user, index) => {
            const { role } = user || {}
            const { name: roleName } = role || {}

            if (user.type === 'Secretary') {
              let { name } = user.userStatus || {}
              if (name === 'Disassociated' || name === 'Suspended') {
              } else {
                return (
                  <View style={styles.group} key={index}>
                    <View style={styles['one']}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                    <View style={styles['two']}>
                      <Text style={styles.title1}>{user.email}</Text>
                    </View>
                    <View style={styles['three']}>
                      <Text style={styles.title1}>
                        {roleName || 'None Assigned'}
                      </Text>
                    </View>
                  </View>
                )
              }
              return null
            }
            return null
          })}
        </View>

        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Inactive Secretaties</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActiveSecretary}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Role Assigned</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {userData.map((user, index) => {
            const { role } = user || {}
            const { name: roleName } = role || {}
            if (user.type === 'Secretary') {
              let { name } = user.userStatus || {}
              if (name === 'Disassociated' || name === 'Suspended') {
                return (
                  <View style={styles.group} key={index}>
                    <View style={styles['one']}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                    <View style={styles['two']}>
                      <Text style={styles.title1}>{user.email}</Text>
                    </View>
                    <View style={styles['three']}>
                      <Text style={styles.title1}>
                        {roleName || 'None Assigned'}
                      </Text>
                    </View>
                  </View>
                )
              }
              return null
            }
            return null
          })}
        </View>

        <View style={styles.group1}>
          <View style={styles.Tleft}>
            <Text style={styles.title}>Total Secretaties Disabled</Text>
          </View>
          <View style={styles.Tright}>
            <Text style={styles.title}>{inActiveSecretary}</Text>
          </View>
        </View>
        <View style={styles.groupHeader}>
          <View style={styles['one']}>
            <Text style={styles.title3}>Full Name</Text>
          </View>
          <View style={styles['two']}>
            <Text style={styles.title3}>Email Address</Text>
          </View>
          <View style={styles['three']}>
            <Text style={styles.title3}>Role Assigned</Text>
          </View>
        </View>
        <View style={styles.group2}>
          {userData.map((user, index) => {
            const { role } = user || {}
            const { name: roleName } = role || {}

            if (user.type === 'Secretary') {
              let { name } = user.userStatus || {}
              if (name === 'Disassociated' || name === 'Suspended') {
                return (
                  <View style={styles.group} key={index}>
                    <View style={styles['one']}>
                      <Text
                        style={styles.title1}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </View>
                    <View style={styles['two']}>
                      <Text style={styles.title1}>{user.email}</Text>
                    </View>
                    <View style={styles['three']}>
                      <Text style={styles.title1}>
                        {roleName || 'None Assigned'}
                      </Text>
                    </View>
                  </View>
                )
              }
              return null
            }
            return null
          })}
        </View>
      </>
    ) : null
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.Title}>Users</Text>
      </View>
      {detail === 1 && <Basic />}
      {detail === 2 && <Intermediate />}
      {detail === 3 && <ExtremelyDetails />}
    </View>
  )
}

export const splitArrayIntoChunksOfLen = (arr, len) => {
  var chunks = [],
    i = 0,
    n = arr.length
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)))
  }
  return chunks
}
