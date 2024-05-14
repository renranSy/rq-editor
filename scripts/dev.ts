import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('..', import.meta.url))
const resolvePath = (p: string) => path.resolve(__dirname, p)

!(async () => {
  console.log(resolvePath('dev'))
  const server = await createServer({
    root: 'dev',
    base: '/',
    publicDir: resolvePath('dev/public'),
    server: {
      port: 6101
    },
    resolve: {
      alias: {
        '@': resolvePath('dev/src'),
        '~': resolvePath('packages')
      }
    },
    plugins: [react()],
    css: {
      modules: {
        localsConvention: 'camelCase'
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  })
  await server.listen()
  server.printUrls()
})()
