import { fileURLToPath } from 'node:url'
import path from 'path'
import { build, LibraryFormats } from 'vite'
import removeDir from './utils/removeDir'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

const __dirname = fileURLToPath(new URL('..', import.meta.url))
const resolvePath = (p: string) => path.resolve(__dirname, p)

!(async () => {
  const moduleEntry = {
    index: resolvePath('packages'),
    RTEditor: resolvePath('packages/RTEditor')
  }
  const formats: LibraryFormats[] = ['es', 'cjs', 'umd']

  const entries = {
    es: {
      ...moduleEntry
    },
    cjs: moduleEntry,
    umd: resolvePath('packages')
  }

  removeDir(resolvePath('lib'))

  const externalNames = {
    es: 'mjs',
    cjs: 'cjs'
  }

  await Promise.all(
    formats.map((t) => {
      return build({
        base: '/',
        plugins: [
          react(),
          t === 'es' &&
            dts({
              include: [resolvePath('packages')],
              outDir: resolvePath('lib/types')
            })
        ],
        resolve: {
          alias: {
            '~': resolvePath('packages')
          }
        },
        css: {
          modules: {
            localsConvention: 'camelCase'
          },
          preprocessorOptions: {
            less: {
              javascriptEnabled: true
            }
          }
        },
        build: {
          emptyOutDir: false,
          cssCodeSplit: true,
          outDir: resolvePath('lib'),
          lib: {
            entry: entries[t],
            name: 'RTEditor',
            formats: [t],
            fileName(format) {
              switch (format) {
                case 'es': {
                  return 'es/[name].mjs'
                }
                case 'cjs':
                  return 'cjs/[name].cjs'
                default: {
                  return 'umd/index.js'
                }
              }
            }
          },
          rollupOptions: {
            external: t === 'umd' ? ['react', 'react-dom'] : ['react', 'react-dom', 'quill'],
            output: {
              chunkFileNames: `${t}/chunks/[name].${externalNames[t]}`,
              assetFileNames: 'index[extname]',
              globals:
                t === 'umd'
                  ? {
                      react: 'React',
                      'react-dom': 'ReactDOM'
                    }
                  : {}
            }
          }
        }
      })
    })
  )
})()
