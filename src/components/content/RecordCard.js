import React, { useRef, useState, useContext } from 'react'
import 'styled-components/macro'
import { useOnClickOutside } from 'hooks'
import { Icons, Colours, Core } from 'components'
import { useHistory } from 'react-router-dom'
import { OrganisationContext } from 'context'

export default function RecordCard({
  options,
  button,
  toggle,
  search,
  active = 'Active',
  setActive,
  title,
  query,
  setQuery,
  children,
  to,
  main,
}) {
  const history = useHistory()
  const { status } = useContext(OrganisationContext)

  const [showOptions, setShowOption] = useState(false)

  return (
    <div
      css={`
        height: 350px;
        width: 100%;
        border-radius: 5px;
        margin-bottom: 20px;
        display: grid;
        grid-template-rows: max-content 1fr;
        border: 1px solid ${Colours.border};
        position: relative;
      `}
    >
      <div
        css={`
          background: #faf8ff;
          height: 50px;
          display: grid;
          grid-template-columns: ${toggle
            ? '1fr repeat(2,max-content)'
            : search
            ? 'max-content 1fr max-content'
            : '1fr max-content'};
          padding: 3px 10px;
          align-items: center;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border-bottom: 1px solid ${Colours.border};
          grid-gap: 10px;
          align-items: center;
        `}
      >
        <Core.Text
          color={Colours.teal}
          weight="500"
          customSize="25px"
          overrideCustomSize="20px"
          screen="1400px"
        >
          {title}
        </Core.Text>
        {search && (
          <Search inside title={title} query={query} setQuery={setQuery} />
        )}
        {toggle && <Toggle setActive={setActive} active={active} />}
        {button && (
          <div
            css={`
              &:hover {
                cursor: ${status === 'SUSPENDED' ? 'not-allowed' : 'pointer'};
              }
              display: grid;
              grid-template-columns: max-content max-content;
              align-items: center;
            `}
            onClick={() => {
              if (status !== 'SUSPENDED') history.push(to)
            }}
          >
            <Icons.AddRoundedIcon
              style={{
                color: Colours.purple,
                margin: '0px',
                paddingTop: '3px',
                fontSize: '20px',
              }}
            />
            <Core.Text customSize="20px" color={Colours.purple}>
              New
            </Core.Text>
          </div>
        )}
        {options && (
          <section
            css={`
              color: ${Colours.icon};
              &:hover {
                cursor: pointer;
                color: ${Colours.purple};
              }
            `}
            onClick={() => setShowOption(!showOptions)}
          >
            <Icons.MoreVertIcon
              style={{ color: 'inherit', paddingTop: '3px' }}
            />
          </section>
        )}
      </div>
      <div
        css={`
          padding: 10px;
          overflow-y: auto;
        `}
      >
        {showOptions && (
          <MenuOptions
            status={status}
            to={to}
            main={main}
            setShowOption={setShowOption}
          />
        )}
        {children}
      </div>
    </div>
  )
}

const MenuOptions = ({ setShowOption, to, main, status }) => {
  const ref = useRef()
  useOnClickOutside(ref, () => {
    setShowOption(false)
    return null
  })

  return (
    <div
      ref={ref}
      css={`
        position: absolute;
        transform: translateY(-1px);
        z-index: 10000;
        min-height: 100px;
        width: 200px;
        right: 0;
        top: 50px;
        border-radius: 5px;
        grid-template-rows: max-content 1fr;
        background: ${Colours.foreground};
        border: 0.5px solid #f0f0f0;
        box-shadow: 0px 0px 41px -24px rgba(194, 194, 194, 1);
        margin-right: 20px;
      `}
    >
      <div
        css={`
          height: 40px;
          width: 100%;
          display: grid;
          place-items: center;
          box-shadow: 0 2px 2px -1px rgba(152, 162, 179, 0.3),
            0 1px 5px -2px rgba(152, 162, 179, 0.3);
        `}
      >
        <Core.Text>Actions</Core.Text>
      </div>
      <div
        css={`
          width: calc(100% - 20px);
          padding: 10px;
        `}
      >
        <Items
          to={to}
          Icon={Icons.AddRoundedIcon}
          label="New"
          setShowOption={setShowOption}
          purpose="major"
          status={status}
        />
        <Items
          main={main}
          Icon={Icons.LaunchIcon}
          label="View All"
          setShowOption={setShowOption}
          status={status}
        />
      </div>
    </div>
  )
}

const Items = ({ Icon, main, to, label, status, purpose, setShowOption }) => {
  const history = useHistory()

  return (
    <div
      css={`
        z-index: 1000;
        width: calc(100% - 20px);
        padding-left: 20px;
        height: 40px;
        display: grid;
        align-items: center;
        justify-items: start;
        grid-column-gap: 20px;
        grid-template-columns: max-content 1fr;
        color: ${Colours.textGrey};
        &:hover {
          cursor: ${status === 'SUSPENDED' && purpose === 'major'
            ? 'not-allowed'
            : 'pointer'};
          color: ${Colours.purple};
          background: #f3f5ff;
        }
      `}
      onClick={() => {
        if (status === 'SUSPENDED' && purpose === 'major') {
        } else {
          label === 'New' ? history.push(to) : history.push(main)
          setShowOption(false)
        }
      }}
    >
      <Icon />
      {label}
    </div>
  )
}

const Toggle = ({ active, setActive }) => {
  return (
    <div
      css={`
        border-radius: 5px;
        background: ${Colours.foreground};
        padding: 2px;
        width: 300px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        border: 1px solid ${Colours.border};
      `}
    >
      <div
        css={`
          width: 150px;
          height: 100%;
          display: grid;
          place-items: Center;
          transition: ease-out 0.5s;
          background: ${active === 'Active'
            ? Colours.purple
            : Colours.foreground};
          color: ${active === 'Active' ? Colours.foreground : Colours.text};
          border-radius: 5px;
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={() => {
          if (active !== 'Active') setActive('Active')
        }}
      >
        Active
      </div>
      <div
        css={`
          width: 150px;
          height: 100%;
          display: grid;
          place-items: Center;
          background: ${active === 'Past'
            ? Colours.purple
            : Colours.foreground};
          color: ${active === 'Past' ? Colours.foreground : Colours.text};
          border-radius: 5px;
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={() => {
          if (active !== 'Past') setActive('Past')
        }}
      >
        Past
      </div>
    </div>
  )
}

export const Search = ({ query, setQuery, title, inside }) => {
  return (
    <div
      css={`
        border: 1px solid ${Colours.border};
        display: grid;
        grid-template-columns: 1fr max-content;
        border-radius: 5px;
        background: #fff;
        height: ${inside ? 'calc(60% - 2px)' : '100%'};
      `}
    >
      <input
        tyle="text"
        value={query}
        onChange={(e) => setQuery(e)}
        placeholder={`Search ${title}`}
        css={`
          outline: none;
          border: none;
          background: inherit;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          padding-left: 5px;
          &::placeholder {
            color: ${Colours.textGrey};
            font-size: 14px;
          }
        `}
      />
      <div
        css={`
          background: ${Colours.border};
          display: grid;
          place-items: center;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          width: 40px;
        `}
      >
        <Icons.SearchRoundedIcon style={{ color: Colours.icon }} />
      </div>
    </div>
  )
}
