# Core Module

This folder contains core utilities and shared functionality that are used throughout the application.

## Structure

```
core/
└── README.md          # This file
```

## Purpose

The core module is designed to hold shared utilities, constants, and other application-wide functionality. Currently, no core services are defined, but this is where they would be placed if needed in the future.

## Adding New Core Functionality

1. Create your files in the `core/` folder
2. For services, create a `services/` subfolder
3. Export services in `services/index.ts` for clean imports
4. Import using relative paths as needed 