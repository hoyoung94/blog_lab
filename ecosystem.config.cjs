module.exports = {
  apps: [
    {
      name: "blog-lab",
      cwd: __dirname,
      script: "npm",
      args: "run start:prod",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
