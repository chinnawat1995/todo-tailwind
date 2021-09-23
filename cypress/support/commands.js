Cypress.Commands.add('login', () => {
  cy.intercept('/api/auth/session', { fixture: 'session.json' }).as('session')

  // Set the cookie for cypress.
  // It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
  // This step can probably/hopefully be improved.
  // We are currently unsure about this part.
  // We need to refresh this cookie once in a while.
  // We are unsure if this is true and if true, when it needs to be refreshed.
  cy.setCookie(
    'next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiemlwIjoiREVGIn0..7lHG2_Gzw5Zm5WCI.bNXtSLw2JrQJy1vgMzsAkd1H9S54UuXPp_txpF5O7ry56eLbC0lUdZVvvCJayYzDgYh9GpB6Zc8tVU5dwDT46FsG06ayAnZT6tFQtk9_Ki4vCb1hHzYlobf1M45yZTUDbgmB71TYZL9uGZlCcw9CZpfatZlJAz5ts0tv3wvtLbKXZ1oU6uwIWZlRfn0GBhT68fgNh1mHc4uaTLk8NNEo26Wv_-8ofFe376VeUY7PsQ_xeUmOpjChwN3VAAYeRmCkCA76s3701v9HsqHcB0wfWHf3WB94YGMk1b_gO6N3tyDniszoFfX-G37GvQV5ChWtr0q1jfAAh9b8qCyU2JCHzicqQee7cHzz8RgDK9HcWggNcgPuvx7HUZ3wCtlVvkBoMLw-h4x4cx982JnS9PPWJx30lVYuQgEGfFy5n43bRZInEkXbCO3ecYm0-h6TZihtdVzBT2yczjEffwk.TW-uUdkmqt4zV2x7cjT09w'
  )
  Cypress.Cookies.preserveOnce('next-auth.session-token')
})
