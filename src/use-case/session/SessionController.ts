import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import crypto from 'crypto';

interface RegisterCompleteRequestBody {
  userId: number;
  credentialId: string;
  publicKey: string;
  signCount: number;
}
let users: {
  id: string
  username: string
  password: string
}[] = [];

let credentials: {
  credentialId: string
  publicKey: string
  signCount: number
  userId: string
}[] = []

export class SessionController {
  async create(req: Request, res: Response) {
    console.log(req.body)
    return res.status(201).json({ success: true })
  }

  async generateRegistration(req: Request, res: Response) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const id = crypto.randomUUID()
    users.push({
      id,
      username,
      password: hashedPassword,
    })

    const challenge = crypto.randomBytes(32).toString('base64url');

    res.json({ challenge, userId: id });
  }

  async verifyRegistration(req: Request, res: Response) {
    const { userId, credentialId, publicKey, signCount } = req.body;
    credentials.push({
      credentialId,
      publicKey,
      signCount,
      userId,
    })
    res.status(201).send('Registration complete');
  }

  async generateAuthentication(req: Request, res: Response) {
    const { username } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).send('User not found');
    }

    const webAuthnCreds = credentials.filter(cred => cred.userId === user.id);

    const challenge = crypto.randomBytes(32).toString('base64url');

    res.json({ challenge, credentials: webAuthnCreds });
  }

  async verifyAuthentication(req: Request, res: Response) {
    const { credentialId, clientDataJSON, authenticatorData, signature } = req.body;

    const credential = credentials.find(cred => cred.credentialId === credentialId);

    if (!credential) {
      return res.status(400).send('Credential not found');
    }

    // Validação do WebAuthn
    // Implementar a validação do challenge, clientDataJSON, authenticatorData e signature

    res.status(200).send('Authentication successful');
  }
}