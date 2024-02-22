

import { Checksum } from "./sum";

export class Fingerprint {
    readonly name: string;
    readonly checksum: string;

    constructor(name: string, sum: string) {
        this.name = name;
        this.checksum = sum;
    }
}

export const NewFingerprint = async (file: File): Promise<Fingerprint> => {
    const arrBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrBuffer);
    
    const sum = Checksum.compute(bytes);

    return new Fingerprint(file.name, sum);
}