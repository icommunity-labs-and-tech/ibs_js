

import { Client } from "./client/client";
import { NewEvidenceResponse } from "./certification";
import { Fingerprint, NewFingerprint } from "./fingerptint";

export class IbsClient {
    private readonly client: Client;

    constructor(token: string) {
        this.client = new Client(token);
    }

    async certificate(client_secret: string, req: EvidenceRequest): Promise<NewEvidenceResponse> {
        if (req.files[0] instanceof File) {
            const payload = req.files.map(async file => {
                return await NewFingerprint(file as File);
            });

            const content = await Promise.all(payload);

            return await this.client.newEvidence(client_secret, req.title, req.signatures, content);
        } else { // is a fingerprints list
            return await this.client.newEvidence(client_secret, req.title, req.signatures, req.files as (Fingerprint[]));
        }
    }
}

export class EvidenceRequest {
    readonly title: string;
    readonly signatures: string[];
    readonly files: (File | Fingerprint)[];

    constructor(title: string, signatures: string[], files: (File | Fingerprint)[]) {
        this.title = title;
        this.signatures = signatures;
        this.files = files;
    }
}