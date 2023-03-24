import CheckoutWizard from '@/components/checkoutWizard'
import Layout from '@/components/Layout'
import React from 'react'

export default function Payment() {
  return (
    <div>
      <Layout title='Payment method'>
        <CheckoutWizard activeStep={2}>
            <form className='mx-auto max-w-screen-md' onSubmit={submitHandler}>

            </form>
        </CheckoutWizard>

      </Layout>
    </div>
  )
}
