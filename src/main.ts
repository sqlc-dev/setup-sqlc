import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

function downloadUrl(version: string): string {
  let plat = ''
  let arch = ''

  switch (process.platform) {
    case 'win32': {
      plat = 'windows'
      break
    }
    case 'darwin': {
      plat = 'darwin'
      break
    }
    case 'linux': {
      plat = 'linux'
      break
    }
    default: {
      core.setFailed(`Unsupported platform: ${process.platform}`)
      return ''
    }
  }

  switch (process.arch) {
    case 'x64': {
      arch = 'amd64'
      break
    }
    case 'arm64': {
      arch = 'arm64'
      break
    }
    default: {
      core.setFailed(`Unsupported architecture: ${process.arch}`)
      return ''
    }
  }

  return `https://downloads.sqlc.dev/sqlc_${version}_${plat}_${arch}.zip`
}

async function run(): Promise<void> {
  try {
    const version = core.getInput('sqlc-version')
    if (!version) {
      core.setFailed(`sqlc-version not set`)
      return
    }
    const toolDir = tc.find('sqlc', version, process.arch)
    if (toolDir !== '') {
      core.addPath(toolDir)
      return
    }

    const toolUrl = downloadUrl(version)
    if (toolUrl === '') {
      return
    }

    const downloadPath = await tc.downloadTool(toolUrl)
    const extPath = await tc.extractZip(downloadPath)
    const cachedPath = await tc.cacheDir(extPath, 'sqlc', version)
    core.info(cachedPath)
    core.addPath(cachedPath)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
