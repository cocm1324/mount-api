import { Request, Response } from 'express'

export type ControllerFn = (req: Request, res: Response) => void;
