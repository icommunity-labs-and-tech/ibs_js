

import { createHash } from "crypto";

export class Checksum {
  private static readonly algorithm: string = "sha512";

  public static compute(text: Uint8Array): string {    
    return createHash(this.algorithm).update(text).digest("base64");
  }
}