module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-aws');
  grunt.initConfig({
    aws: grunt.file.readJSON('credentials.json'),
    s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>',
        secretAccessKey: '<%= aws.secretAccessKey %>',
        bucket: 'bookings-module-static-assets',
        region: 'us-west-1',
      },
      build: {
        cwd: 'public/',
        src: '**',
      },
    },
  });
};
