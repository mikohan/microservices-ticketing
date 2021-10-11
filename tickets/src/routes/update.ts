import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from '@angara_digital/common';

import { Ticket } from '../models/ticket';

const router = express.Router();
router.put('/api/tickets/:id', async (req: Request, res: Response) => {
  const { title, price, userId } = req.body;
});

export { router as updateTicketRouter };
