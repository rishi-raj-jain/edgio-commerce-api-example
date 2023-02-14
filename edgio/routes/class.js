import { getImage } from './images'
import PluginBase from '@edgio/core/plugins/PluginBase'
import { getAllProducts, getSpecificProduct } from './products'
import { getAllCategories, getSpecificCategory } from './category'

export default class CustomRoutes extends PluginBase {
  onRegister(router) {
    getImage(router)
    getAllProducts(router)
    getAllCategories(router)
    getSpecificProduct(router)
    getSpecificCategory(router)
  }
}
