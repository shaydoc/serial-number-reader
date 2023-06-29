"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        // ...
        environment: 'jsdom',
        globals: true,
        threads: false,
        watch: false,
        include: ['**/*.test.{js,tsx,ts}'],
    },
});
