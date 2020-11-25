const backUrl = process.env.NODE_ENV === 'production' ? 'https://api.nodebird.com' : 'http://localhost:3050';

export { backUrl };

export default {
  backUrl,
};
