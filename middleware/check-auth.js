export default function ({ store, req }) {
    if (process.server && !req) return;

    const userData = process.server ? getUserFromCookie(req) : getUserFromLocalStorage();
}
