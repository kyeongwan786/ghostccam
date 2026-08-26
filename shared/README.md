# Shared modules

This folder contains platform-neutral contracts used by more than one GhostCam
surface. Keep browser APIs, native UI, and server secrets out of this folder.

- `ghostcam.ts`: request and response types shared by the web client, future
  native app, and image-generation route.
