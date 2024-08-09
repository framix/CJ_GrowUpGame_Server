module.exports = {
  apps: [{
    name: 'sf_game',
    script: './sf_game/run_game.js',
    kill_timeout: 10000,
    instances: -1,
    exec_mode: "cluster",
    autorestart: true,
    max_memory_restart: '1G',
  }],

  deploy: {
    production: {
      user: 'ec2-user',
      host: '52.78.98.96',
      ref: 'origin/prod',
      repo: 'git@github.com:framix/CJ_GrowUpGame_Server.git',
      path: '/home/master/CJ_GrowUpGame_Server',
      'post-deploy': 'npm install && pm2 reload game.config.js --env production',
    }
  }
};
