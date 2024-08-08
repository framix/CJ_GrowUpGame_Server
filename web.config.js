module.exports = {
  apps: [{
    name: 'sf_web',
    script: './sf_web/main.js',
    kill_timeout: 10000,
    instances: -1,
    exec_mode: "cluster",
    autorestart: true,
    max_memory_restart: '1G',
  }],

  deploy: {
    production: {
      user: 'ec2-user',
      host: '3.35.70.185',
      ref: 'origin/master',
      repo: 'git@github.com:framix/CJ_GrowUpGame_Server.git',
      path: '/home/master/CJ_GrowUpGame_Server',
      'post-deploy': 'npm install && pm2 reload web.config.js --env production',
    }
  }
};
