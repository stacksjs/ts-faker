import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

export type PackageManager = 'bun' | 'npm' | 'yarn' | 'pnpm'

/**
 * Check if we're running in a workspace environment
 */
export function isInWorkspace(): boolean {
  const cwd = process.cwd()
  const packageJsonPath = join(cwd, 'package.json')

  if (!existsSync(packageJsonPath)) {
    return false
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    return !!(packageJson.workspaces || packageJson.workspace)
  }
  catch {
    return false
  }
}

/**
 * Detect the package manager used in the current project
 */
export function detectPackageManager(): PackageManager {
  // Check for lock files in order of preference
  const cwd = process.cwd()

  if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) {
    return 'bun'
  }
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm'
  }
  if (existsSync(join(cwd, 'yarn.lock'))) {
    return 'yarn'
  }
  if (existsSync(join(cwd, 'package-lock.json'))) {
    return 'npm'
  }

  // Default to bun if no lock file is found
  return 'bun'
}

/**
 * Install a package using the detected package manager
 */
export function installPackage(packageName: string, options: { silent?: boolean } = {}): boolean {
  const pm = detectPackageManager()
  const { silent = false } = options

  // Note: We don't skip installation for workspace packages here anymore.
  // Instead, we let the installation attempt proceed and handle dependency loop errors gracefully.

  if (!silent) {

    console.log(`\n📦 Installing ${packageName} using ${pm}...`)
  }

  const commands: Record<PackageManager, { cmd: string, args: string[] }> = {
    bun: { cmd: 'bun', args: ['add', packageName] },
    npm: { cmd: 'npm', args: ['install', packageName] },
    yarn: { cmd: 'yarn', args: ['add', packageName] },
    pnpm: { cmd: 'pnpm', args: ['add', packageName] },
  }

  const { cmd, args } = commands[pm]

  try {
    const result = spawnSync(cmd, args, {
      stdio: 'pipe',
      shell: true,
    })

    // Capture output regardless of silent mode for error analysis
    const stdout = result.stdout?.toString() || ''
    const stderr = result.stderr?.toString() || ''
    const combinedOutput = stdout + stderr

    if (!silent) {
      // Show the output to user if not silent
      if (stdout) {
    
        console.log(stdout)
      }
      if (stderr) {
        console.error(stderr)
      }
    }

    if (result.status === 0) {
      if (!silent) {
    
        console.log(`✓ Successfully installed ${packageName}`)
      }
      return true
    }
    else {
      // Get error output to check for specific error types
      const errorOutput = combinedOutput

      // Check for dependency loop error - be more comprehensive in matching
      const hasDependencyLoop = errorOutput.toLowerCase().includes('dependency loop')
        || errorOutput.includes('DependencyLoop')
        || errorOutput.includes('has a dependency loop')
        || errorOutput.includes('An internal error occurred (DependencyLoop)')

      if (hasDependencyLoop) {
        if (!silent) {
      
          console.log(`\n⚠️  Package ${packageName} is already available in the workspace and cannot be installed separately due to a dependency loop.`)
          if (isInWorkspace()) {
        
            console.log(`   This is expected when running in a workspace environment. The package should be available for import.`)
          }
        }
        // Return true since the package should be available in the workspace
        return true
      }

      if (!silent) {
        console.error(`✗ Failed to install ${packageName}`)
      }
      return false
    }
  }
  catch (error) {
    if (!silent) {
      console.error(`✗ Error installing ${packageName}:`, error)
    }
    return false
  }
}
