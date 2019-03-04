/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},"updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken","billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","fullName"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"deliverContactFormMessage":{"verb":"POST","url":"/api/v1/deliver-contact-form-message","args":["emailAddress","topic","fullName","message"]},"destroyOneSuperviseur":{"verb":"DELETE","url":"/api/v1/superviseurs/destroy-one-superviseur","args":["id"]},"uploadSuperviseur":{"verb":"POST","url":"/api/v1/superviseurs/upload-superviseur","args":["photo","nom","prenom","dateEntry","equipe","dateFin","actif","chart","ressources","acces"]},"downloadPhoto":{"verb":"GET","url":"/api/v1/superviseurs/:id/photo","args":["id"]},"addOneRessource":{"verb":"POST","url":"/api/v1/superviseurs/add-one-ressource","args":["ressource"]},"destroyOneRessource":{"verb":"DELETE","url":"/api/v1/superviseurs/destroy-one-ressource","args":["id"]},"addOneAcce":{"verb":"POST","url":"/api/v1/superviseurs/add-one-acce","args":["acce"]},"destroyOneAcce":{"verb":"DELETE","url":"/api/v1/superviseurs/destroy-one-acce","args":["id"]}}
  /* eslint-enable */

});
