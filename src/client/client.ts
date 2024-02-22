

import { NewEvidenceResponse } from "../certification";
import { Fingerprint } from "../fingerptint";
import { EvidenceRequest } from "./evidence";

const ibsHost = 'https://api.icommunitylabs.com'

const createEvidenceEndpoint  = ibsHost + '/sdk/evidences/sealed'

export class Client {
    private readonly token: string;

    constructor(token: string) {
        this.token = token;
    }

    async attach(client_secret: string, title: string, signatures: string[], integrity: Fingerprint[]): Promise<NewEvidenceResponse> {
        const req = new EvidenceRequest(client_secret, title, signatures, integrity);

        const response = await fetch(createEvidenceEndpoint, {
            method: 'POST',
            headers: {
                'Origin': window.location.origin,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: req.build() 
        }).then(res => res.json());

        return new NewEvidenceResponse(response.id);
    }
}