// import { datadogLogs } from '@datadog/browser-logs'
// import * as datadog from '@datadog/node'
import { useRuntimeConfig } from '#app'

// const { datadogKey } = useRuntimeConfig().public

export function logError(error: unknown, context: string) {
  console.error(`[ERROR] ${context}`, error)

//   if (process.client) {
//     datadogLogs.logger.error(context, { error })
//   }

//   if (process.server && serverLogger) {
//     serverLogger.error(context, { error })
//   }
}

export function logInfo(message: string, context: string) {
  console.log(`[INFO] ${context}: ${message}`)

//   if (process.client) {
//     datadogLogs.logger.info(context, { message })
//   }

//   if (process.server && serverLogger) {
//     serverLogger.info(context, { message })
//   }
}