/* 
commande pour lancer:

pm2 start ecosystem.config.js --env production
*/
module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./server.js",
      instances: 3,
      exec_mode: "cluster",
      max_memory_restart: "200M",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      combine_logs: true,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
