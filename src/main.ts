import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

async function run(): Promise<void> {
  try {
    const version = core.getInput('sqlc-version') || '1.9.0'
    const toolDir = tc.find('sqlc', version, 'x64')
    if (toolDir !== '') {
      core.addPath(toolDir)
      return
    }

    switch (process.platform) {
      case 'win32': {
        const toolUrl = `https://downloads.sqlc.dev/sqlc_${version}_windows_amd64.zip`
        const downloadPath = await tc.downloadTool(toolUrl)
        const extPath = await tc.extractZip(downloadPath)
        const cachedPath = await tc.cacheDir(extPath, 'sqlc', version)
        core.addPath(cachedPath)
        break
      }

      case 'darwin': {
        const toolUrl = `https://downloads.sqlc.dev/sqlc_${version}_darwin_amd64.zip`
        const downloadPath = await tc.downloadTool(toolUrl)
        const extPath = await tc.extractZip(downloadPath)
        const cachedPath = await tc.cacheDir(extPath, 'sqlc', version)
        core.addPath(cachedPath)
        break
      }

      case 'linux': {
        const toolUrl = `https://downloads.sqlc.dev/sqlc_${version}_linux_amd64.zip`
        const downloadPath = await tc.downloadTool(toolUrl)
        const extPath = await tc.extractTar(downloadPath)
        const cachedPath = await tc.cacheDir(extPath, 'sqlc', version)
        core.addPath(cachedPath)
        break
      }

      default: {
        core.setFailed(`Unsupported platform: ${process.platform}`)
      }
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
