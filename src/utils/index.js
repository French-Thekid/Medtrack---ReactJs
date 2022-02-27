import { ArrayHelper } from './ArrayHelper'
import { SimpleCache } from './SimpleCache'
import { set, get } from 'idb-keyval'
import Request from './Request'
import moment from 'moment'

const timestampToTime = (timestamp) => {
  let minutes = new Date(parseInt(timestamp)).getMinutes().toString()
  if (minutes.length < 2) minutes = '0' + minutes
  return new Date(parseInt(timestamp)).getHours().toString() + ':' + minutes
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function findCountry(key) {
  const countries = JSON.parse(localStorage.getItem('Countries'))
  let result = 'Jamaica'
  if (countries) {
    countries.map(({ id, name }, index) => {
      if (id === key) {
        result = name
      }
      return null
    })
    return result
  }
  return result
}

function findProvince(key, country) {
  let countryKey = findCountry(country)
  const provinces = JSON.parse(localStorage.getItem(countryKey))
  let result = 'Kingston'
  if (provinces) {
    provinces.map(({ id, name }, index) => {
      if (id === key) result = name
      return null
    })
    return result
  }
  return result
}

function AddFiveHours(time) {
  return new Date(moment(time).add(5, 'hours'))
}

function twentyFourToTwelve(hour) {
  switch (hour) {
    case 0:
      return 12
    case 13:
      return 1
    case 14:
      return 2
    case 15:
      return 3
    case 16:
      return 4
    case 17:
      return 5
    case 18:
      return 6
    case 19:
      return 7
    case 20:
      return 8
    case 21:
      return 9
    case 22:
      return 10
    case 23:
      return 11
    default:
      return hour
  }
}

let TimeExtrator = new Intl.DateTimeFormat('en', {
  timeStyle: 'short',
})

function GetTemplate(idToken) {
  //Fetching template
  const template = []
  try {
    Request({
      type: 'get',
      url: 'v1/organization/read',
      authorization: idToken,
    })
      .then((result) => result.json())
      .then((json) => {
        console.log(json)
        //Todo Refer backend about improvement
        Object.keys(!json.message && json.templates.slip).length > 0
          ? template.push({
              avatar: json.templates.slip.avatar,
              title: json.templates.slip.headerContent,
              name: json.templates.slip.templateName,
              footer: json.templates.slip.footerContent,
              sections: json.templates.slip.body.map(
                (section) => section.title
              ),
            })
          : console.log('no template created')
        localStorage.setItem('template', JSON.stringify(template))
      })
  } catch (error) {
    console.log(error)
  }
}

function Logger(message, type = 'general', rid = null, callback = () => {}) {
  let user = JSON.parse(localStorage.getItem('user')) || {}
  fetch('https://api.ipify.org/?format=json')
    .then((response) => response.json())
    .then((data) => {
      let values = {}
      values.user = user.id || null
      values.name = user.name || null
      values.timestamp = new Date().getTime()
      values.readableDate = new Date().toUTCString()
      values.path = window.location.pathname
      values.message = message
      values.logType = localStorage.getItem('walkthroughId') ? 'workflow' : type
      values.resourceId = rid
      values.ip = data.ip
      Store(values, callback)
    })
    .catch((e) => console.log(e))
}

function Store(obj, callback) {
  get('log')
    .then((res) => {
      //retrieve update and store
      if (res) {
        let data = [...res]
        data.push(obj)
        set('log', data)
      } else {
        //create and store
        let data = []
        data.push(obj)
        set('log', data)
      }
    })
    .then(() => {
      callback()
    })
    .catch(() => {
      callback()
    })
}

function getParameterByName(name, url = window.location.href) {
  //eslint-disable-next-line
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export {
  Logger,
  getParameterByName,
  GetTemplate,
  ArrayHelper,
  twentyFourToTwelve,
  formatNumber,
  SimpleCache,
  Request,
  timestampToTime,
  TimeExtrator,
  findCountry,
  findProvince,
  AddFiveHours,
}
