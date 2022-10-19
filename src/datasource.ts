import { IntegrationBase } from "@budibase/types"
import Stripe from "stripe"

class CustomIntegration implements IntegrationBase {
  private readonly stripe: Stripe

  constructor(config: { apiKey: string; }) {
    this.stripe = new Stripe(config.apiKey, {
      apiVersion: '2022-08-01'
    })
  }

  async create(query: { json: object; extra: { [key: string]: string } }) {
    let params: any = {
      type: query.extra.type
    }
    params[query.extra.type] = query.json
    return await this.stripe.paymentMethods.create(params)
  }

  async read(query: { id: string; extra: { [key: string]: string } }) {
    return await this.stripe.paymentMethods.retrieve(query.id)
  }

  async update(query: { id: string, body: string; extra: { [key: string]: string } }) {
    return await this.stripe.paymentMethods.update(query.id, JSON.parse(query.body))
  }

  async delete(query: { id: string; extra: { [key: string]: string } }) {
    //return await this.stripe.paymentMethods
  }
}

export default CustomIntegration
