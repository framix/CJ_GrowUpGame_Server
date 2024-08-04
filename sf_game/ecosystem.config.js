module.exports = {
  apps: [{
    name: 'sf_game',
    script: './run_game.js',
    kill_timeout: 10000,
    instances: -1,
    exec_mode: "cluster",
    autorestart: true,
    max_memory_restart: '1G',
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'git@github.com:framix/CJ_GrowUpGame_Server.git',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
