module.exports = {
  apps: [{
    name: 'sf_db',
    script: './run_db.js',
    kill_timeout: 10000,
    exec_mode: "fork",
    instances: 1,  // 인스턴스 수 (포크 모드에서는 1로 설정)
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
