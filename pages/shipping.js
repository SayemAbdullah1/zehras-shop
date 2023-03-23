import CheckoutWizard from '@/components/checkoutWizard'
import Layout from '@/components/Layout'
import React from 'react'

export default function ShippingScreen() {
  return (
    <div>
      <Layout title='Shipping address'>
        <CheckoutWizard activeStep={1}/>
      </Layout>
    </div>
  )
}
