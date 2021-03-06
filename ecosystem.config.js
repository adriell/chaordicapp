module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "API",
      script    : "app.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },

  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "root",
      host : "localhost",
      ref  : "origin/master",
      repo : "https://github.com/adriell/chaordicapp.git",
      path : "/var/www/html/production",
      "post-deploy" : "pm2 restart ecosystem.config.js --env production"
    },
    dev : {
      user : "root",
      host : "127.0.0.1",
      ref  : "origin/master",
      repo : "https://gitlab.com/chaordic/chaordicapp.git",
      path : "/var/www/html/development",
      "post-deploy" : "npm install && pm2 restart ecosystem.json --env dev",
      env  : {
        NODE_ENV: "dev"
      }
    }
  }
}
