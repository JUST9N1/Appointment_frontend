// src/setupTests.js

// Mock window.matchMedia
global.matchMedia = global.matchMedia || function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
  
  import "@testing-library/jest-dom";
  