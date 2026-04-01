// Dependency Injection Container

import prisma from './config/db'
import { jwtUtils as createJwtUtils } from './config/jwt'
import { env } from './config/env'
import utils from './shared/utils'

import { authRepository as createAuthRepository }  from './modules/auth/auth.repository'
import { pollsRepository as createPollsRepository } from './modules/polls/polls.repository'
import { votesRepository as createVotesRepository } from './modules/votes/votes.repository'

import { authService as createAuthService }  from './modules/auth/auth.service'
import { pollsService as createPollsService } from './modules/polls/polls.service'
import { votesService as createVotesService } from './modules/votes/votes.service'

import { authController as createAuthController }  from './modules/auth/auth.controller'
import { pollsController as createPollsController } from './modules/polls/polls.controller'
import { votesController as createVotesController } from './modules/votes/votes.controller'

import { AuthMiddleware as createAuthMiddleware } from './shared/middleware/auth'
import { authRoutes as createAuthRoutes } from './modules/auth/auth.routes'
import { pollsRoutes as createPollsRoutes } from './modules/polls/polls.routes'
import { votesRoutes as createVotesRoutes } from './modules/votes/votes.routes'

export function buildContainer() {

  const jwtUtils = createJwtUtils(env.SECRET_KEY)

  // Repositories
  const authRepository  = createAuthRepository(prisma)
  const pollsRepository = createPollsRepository(prisma)
  const votesRepository = createVotesRepository(prisma)

  // Services
  const authService  = createAuthService(authRepository, jwtUtils, utils, env)
  const pollsService = createPollsService(pollsRepository)
  const votesService = createVotesService(votesRepository)

  // Controllers
  const authController  = createAuthController(authService, utils)
  const pollsController = createPollsController(pollsService)
  const votesController = createVotesController(votesService)

  // Middleware
  const authMiddleware = createAuthMiddleware(jwtUtils, env)

  // Routes
  const authRoutes  = createAuthRoutes(authController, authMiddleware)
  const pollsRoutes = createPollsRoutes(pollsController, authMiddleware)
  const votesRoutes = createVotesRoutes(votesController, authMiddleware)

  return { authRoutes, pollsRoutes, votesRoutes }
}