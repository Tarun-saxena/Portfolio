import { createHash } from "crypto";

export function hashIp(ip: string) {
    const salt = process.env.IP_HASH_SALT ?? "";
    return createHash("sha256").update(ip + salt).digest("hex");
}