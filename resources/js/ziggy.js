const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"home":{"uri":"\/","methods":["GET","HEAD"]},"register":{"uri":"register","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"login.store":{"uri":"login","methods":["POST"]},"dashboard":{"uri":"dashboard","methods":["GET","HEAD"]},"logout":{"uri":"logout","methods":["POST"]},"rooms.create":{"uri":"rooms\/create","methods":["GET","HEAD"]},"rooms.store":{"uri":"rooms","methods":["POST"]},"storage.local":{"uri":"storage\/{path}","methods":["GET","HEAD"],"wheres":{"path":".*"},"parameters":["path"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
