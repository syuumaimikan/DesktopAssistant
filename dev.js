const { spawn } = require("child_process");

const vite = spawn("npm", ["run", "start"], { stdio: "inherit", shell: true });

vite.on("close", (code) => {
  process.exit(code);
});

const waitOn = spawn("npx", ["wait-on", "http://localhost:5000"], {
  stdio: "inherit",
  shell: true,
});

waitOn.on("close", (code) => {
  if (code === 0) {
    const electron = spawn("npm", ["run", "electron"], {
      stdio: "inherit",
      shell: true,
    });
    electron.on("close", (ec) => {
      vite.kill();
      process.exit(ec);
    });
  } else {
    vite.kill();
    process.exit(code);
  }
});
