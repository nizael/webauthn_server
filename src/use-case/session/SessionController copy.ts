import { generateAuthenticationOptions, VerifiedAuthenticationResponse, generateRegistrationOptions, GenerateRegistrationOptionsOpts, verifyAuthenticationResponse, verifyRegistrationResponse, VerifyRegistrationResponseOpts } from "@simplewebauthn/server";
import { Request, Response } from "express";
import crypto from 'crypto';

interface User {
  challenge: any;
  id: string;
  publicKey: string;
}

let users: Record<string, User> = {};

const encodeBase64URL = (input: Buffer): string => {
  return input.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const generateChallenge = (): string => {
  return encodeBase64URL(crypto.randomBytes(32));
};

export class SessionController {
  async create(req: Request, res: Response) {
    console.log(req.body)
    return res.status(201).json({ success: true })
  }

  async generateRegistration(req: Request, res: Response) {
    const { username } = req.body;
    const challenge = generateChallenge();
    const options = {
      challenge,
      rp: { name: 'localhost' },
      user: {
        id: encodeBase64URL(Buffer.from(username)),
        name: username,
        displayName: username,
      },
      pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
    };

    // Salva o desafio para validação posterior
    users[username] = { id: username, publicKey: '', challenge };
    return res.json(options);
  }

  async verifyRegistration(req: Request, res: Response) {
    const { username, attestation } = req.body;
    const { response } = attestation;
    const { clientDataJSON, attestationObject } = response;

    // Verifica o challenge
    const clientData = JSON.parse(Buffer.from(clientDataJSON, 'base64').toString('utf-8'));
    if (clientData.challenge !== users[username].challenge) {
      return res.status(400).json({ verified: false, reason: 'Challenge não corresponde' });
    }

    // Analise o attestationObject para extrair a chave pública
    const attestationBuffer = Buffer.from(attestationObject, 'base64');
    const attestationStruct = attestationBuffer.slice(32); // Simplificação para o exemplo

    // A chave pública começa após a estrutura de attestation, o resto é simplificado
    const publicKey = attestationStruct.toString('base64');

    // Salva a chave pública
    users[username].publicKey = publicKey;

    res.json({ verified: true });
  }

  async generateAuthentication(req: Request, res: Response) {
    const { username } = req.body;
    const challenge = generateChallenge();

    if (!users[username] || !users[username].publicKey) {
      return res.status(400).json({ error: 'Usuário não registrado' });
    }
    console.log(users[username].publicKey, 'base64')
    const options = {
      challenge,
      allowCredentials: [
        {
          type: 'public-key',
          id: encodeBase64URL(Buffer.from(users[username].publicKey, 'base64')),
        },
      ],
    }

    users[username].challenge = challenge;

    return res.json(options)
  }

  async verifyAuthentication(req: Request, res: Response) {
    const { username, assertion } = req.body;
    const { response } = assertion;
    const { clientDataJSON, authenticatorData, signature } = response;

    const clientData = JSON.parse(Buffer.from(clientDataJSON, 'base64').toString('utf-8'))

    if (clientData.challenge !== users[username].challenge) {
      return res.status(400).json({ verified: false, reason: 'Challenge não corresponde' })
    }

    // Verificar a assinatura usando a chave pública armazenada
    const publicKeyBuffer = Buffer.from(users[username].publicKey, 'base64')
    const verifier = crypto.createVerify('SHA256')
    verifier.update(Buffer.from(clientDataJSON, 'base64'))
    verifier.update(Buffer.from(authenticatorData, 'base64'))
    const isVerified = verifier.verify(publicKeyBuffer, Buffer.from(signature, 'base64'))

    res.json({ verified: isVerified })
  }
}