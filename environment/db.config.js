module.exports = {
  apps: [{
    name: 'sf_db',
    script: './sf_db/run_db.js',
    kill_timeout: 10000,
    exec_mode: "fork",
    instances: 1,  // 인스턴스 수 (포크 모드에서는 1로 설정)
    autorestart: true,
    max_memory_restart: '1G',
  }],

  deploy: {
    production: {
      user: 'ec2-user',
      host: '3.35.70.185',
      ref: 'origin/prod',
      repo: 'git@github.com:framix/CJ_GrowUpGame_Server.git',
      path: '/home/master/CJ_GrowUpGame_Server',
      'post-deploy': 'npm install && pm2 reload db.config.js --env production',
    }
  }
};
