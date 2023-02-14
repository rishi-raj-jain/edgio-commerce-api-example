import { Router } from '@edgio/core'
import CustomRoutes from './edgio/routes/class'

export default new Router().use(new CustomRoutes())
