module.exports = {
  apps: [{
    name: 'flapstream',
    script: '/home/flapstream/app/app.cjs',
    cwd: '/home/flapstream/app',
    env: {
      NODE_ENV: 'production',
      PORT: '5000',
      DATABASE_URL: 'postgresql://USER:PASSWORD@localhost:5432/flapstream',
      ADMIN_PASSWORD: 'YOUR_ADMIN_PASSWORD',
      MORALIS_API_KEY: 'YOUR_MORALIS_API_KEY',
    },
    restart_delay: 3000,
    max_restarts: 10
  }]
}
