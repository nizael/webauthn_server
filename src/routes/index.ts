import { Router } from "express";
import { SESSION_ROUTING } from "./sessionRouting";

export const ROUTING_INDEX = Router()
  .use('/session', SESSION_ROUTING)
