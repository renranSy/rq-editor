import { fileURLToPath } from 'node:url'
import path from 'path'
import { build } from 'vite'
import removeDir from './utils/removeDir'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

const __dirname = fileURLToPath(new URL('..', import.meta.url))
const resolvePath = (p: string) => path.resolve(__dirname, p)

!(async () => {
  removeDir(resolvePath('lib'))

  build({
    base: '/',
    plugins: [
      react(),
      dts({
        include: [resolvePath('packages')],
        outDir: resolvePath('lib'),
        staticImport: true,
        rollupTypes: true
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
        entry: resolvePath('packages/index.ts'),
        name: 'RQEditor',
        fileName: 'index'
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'quill'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            quill: 'Quill'
          }
        }
      }
    }
  })
})()
