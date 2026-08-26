# GhostCam App

The native app surface lives here and is intentionally separate from the web
surface in `../web/`.

The current root scripts build the web surface. When the native framework is
chosen, add its own `package.json` and start/build commands inside this folder.
Platform-neutral API contracts belong in `../shared/`; keep native UI and
device integrations in this folder.
