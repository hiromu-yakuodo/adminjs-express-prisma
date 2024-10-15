import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import { PrismaClient } from '@prisma/client'
// @ts-ignore
import { Database, Resource, getModelByName } from '@adminjs/prisma'

const PORT = 3123
const prisma = new PrismaClient()

AdminJS.registerAdapter({ Database, Resource })

const start = async () => {
  const app = express()

  const adminOptions = {
    resources: [{
      resource: { model: getModelByName('Post'), client: prisma },
      options: {},
    }, {
      resource: { model: getModelByName('User'), client: prisma },
      options: {},
    }],
  }

  const admin = new AdminJS(adminOptions)

  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()