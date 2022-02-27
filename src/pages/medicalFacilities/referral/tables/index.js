import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Table, PermissionCheck, RestrictedAccess } from 'components'

export default function ReferralTable({ Data, searchReferral }) {
  const history = useHistory()
  const { pathname } = useLocation()
  const ReadPermission = PermissionCheck({
    feature: 'Referral',
    action: 'READ',
  })
  // eslint-disable-next-line

  const HeaderData = [
    'Icon',
    'Title',
    'Ref. Number',
    'Facility',
    'Status',
    'Created By',
  ]

  const RowData = Data.map(
    (
      {
        title,
        id,
        toOrganizationObject,
        referralStatus,
        createdByUser,
        ...rest
      },
      index
    ) => {
      const { firstName, lastName, type, person } = createdByUser || {}
      const { title: creatorTitle } = person || {}
      const { name } = toOrganizationObject || {}
      const { name: status } = referralStatus || {}
      return {
        icon: '',
        title,
        id,
        name,
        status,
        createdBy: JSON.stringify({
          title: creatorTitle,
          type,
          firstName,
          lastName,
        }),
        ...rest,
      }
    }
  )

  const handleRowClick = (id, data) => {
    localStorage.setItem('selectedReferral', JSON.stringify(data))
    history.push(`/facility/referrals/viewReferral/${id}`)
  }

  return ReadPermission ? (
    <Table
      MainButtonpath="?action=createReferral"
      title={
        pathname.includes('allReferrals')
          ? 'Showing All Referrals'
          : pathname.includes('openReferrals')
          ? 'Showing Open Referrals'
          : pathname.includes('acceptedReferrals')
          ? 'Showing Accepted Referrals'
          : 'Showing Denied Referrals'
      }
      altTitle="Referrals"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`70px repeat(5,1fr)`}
      searchPlaceholder="Search Referrals"
      buttonTitle="New Referral"
      searchEnable
      rowClick={handleRowClick}
      massLoading={false}
      massError={false}
      noAction
      breakingPoint="1222px"
      searchHandler={searchReferral}
    />
  ) : (
    <RestrictedAccess small />
  )
}
