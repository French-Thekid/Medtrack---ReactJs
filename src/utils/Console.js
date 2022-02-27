import { config } from 'config/config'

class Medconsole {
  static dropSessionandLeave() {
    const tokens =
      JSON.parse(localStorage.getItem('session') || '{}')
        .AuthenticationResult || null
    const request = {
      method: 'POST',
      body: JSON.stringify({
        accessToken: tokens.AccessToken,
      }),
      headers: { Authorization: `cognito ${tokens.IdToken}` },
    }

    fetch(`${config.REST_ENDPOINT}/auth/signout`, request)
      .then(async () => {
        this.discardStorage()
      })
      .catch((err) => {
        console.log(err)
        this.discardStorage()
      })
  }

  static discardStorage() {
    localStorage.removeItem('session')
    localStorage.clear()
    window.location.pathname = '/'
  }

  static Tokens() {
    return (
      JSON.parse(localStorage.getItem('session') || '{}')
        .AuthenticationResult || null
    )
  }

  static qglPlayground() {
    // eslint-disable-next-line
    return `cognito ${this.Tokens().IdToken}`
  }

  static bindWindow() {
    if (process.env.NODE_ENV === 'development') {
      window.medconsole = this
    }
  }
}

export default Medconsole
