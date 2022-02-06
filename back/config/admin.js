module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1427222ab2aeedb5aa969edc1941d3dd'),
  },
});
