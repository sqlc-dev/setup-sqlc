# setup-sqlc

This [action](https://docs.github.com/actions) downloads and installs [sqlc](https://sqlc.dev).

## Usage

```yaml
steps:
# Ensure sqlc is installed
- uses: sqlc-dev/setup-sqlc@v4
  with:
    sqlc-version: '1.25.0'
# Print out the current version
- run: sqlc version
```
