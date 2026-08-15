import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";

function sign(value: string) {
    const secret = process.env.ADMIN_SESSION_SECRET!;
    return createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionToken() {
    const payload = "admin";
    return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined) {
    if (!token) return false;
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return false;
    const expected = sign(payload);
    try {
        return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    } catch {
        return false;
    }
}

export { COOKIE_NAME };