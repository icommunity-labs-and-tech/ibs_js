

import { Fingerprint } from "../fingerptint";

export class EvidenceRequest {
    private readonly client_secret: string;
    private readonly signatures: Signature[];
    private readonly payload: Payload;

    constructor(client_secret: string, title: string, signatures: string[], integrity: Fingerprint[]) {
        this.client_secret = client_secret;
        this.signatures = signatures.map(id => new Signature(id));
        this.payload = new Payload(title, integrity);
    }

    build(): string {
        const request = {
            client_secret: this.client_secret,
            signatures: this.signatures,
            payload: this.payload
        };
        return JSON.stringify(request);
    }
}

class Payload {
    readonly title: string;
    readonly content: string;

    constructor(title: string, integrity: {name: string, checksum: string}[]) {
        this.title = title;
        this.content = JSON.stringify(integrity.map(i => new IntegrityBody(i.name, i.checksum)));
    }
}

class IntegrityBody {
    readonly name: string;
    readonly checksum: string;
    readonly type: string      = "file";
    readonly algorithm: string = "SHA-512";
    readonly sanitizer: string = "base64.standard";

    constructor(name: string, checksum: string) {
        this.name = name;
        this.checksum = checksum;
    }
}

class Signature {
    readonly id: string;

    constructor(id: string) {
        this.id = id;
    }
}