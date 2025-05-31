import glsl from 'vite-plugin-glsl';

export default {
  base: '/threejs-polygonOffset/',
  plugins: [
    glsl() // Handle shader files
  ]
};
