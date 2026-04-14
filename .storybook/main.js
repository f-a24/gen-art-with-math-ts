const config = {
  stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: {
    name: "@storybook/html-vite",
    options: {}
  },
  staticDirs: ['../public'],
};

export default config;
