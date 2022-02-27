const ENV = process.env
export const config = {
  REST_ENDPOINT: `https://${ENV.REACT_APP_API_KEY}.execute-api.${ENV.REACT_APP_API_REGION}.amazonaws.com/${ENV.REACT_APP_API_STAGE}/v1`,
  GQL_ENDPOINT: `https://${ENV.REACT_APP_API_KEY}.execute-api.${ENV.REACT_APP_API_REGION}.amazonaws.com/${ENV.REACT_APP_API_STAGE}/v1/graphQl`,
  ENVIRONMENT: ENV.NODE_ENV,
  API_KEY: ENV.REACT_APP_API_KEY,
  REGION: ENV.REACT_APP_API_REGION,
  STAGE: ENV.REACT_APP_API_STAGE,
  SENTRY_DSN: ENV.REACT_APP_SENTRY_DSN,
  APP_VERSION: ENV.npm_package_version,
}
Object.seal(config)
