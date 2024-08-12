import { Router } from "express";
import { sessionController } from "../use-case/session";

export const SESSION_ROUTING = Router()
  .post('/generate-registration-options',  sessionController.generateRegistration)
  .post('/verify-registration', sessionController.verifyRegistration)
  .post('/generate-authentication-options', sessionController.generateAuthentication)
  .post('/verify-authentication', sessionController.verifyAuthentication)

