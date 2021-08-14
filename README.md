# kyleconroy/setup-sqlc

This action downloads and installs [sqlc](https://sqlc.dev)

# Usage

See [action.yml](action.yml)

Install the latest release:
```yaml
steps:
- uses: kyleconroy/setup-sqlc@v1
  with:
    sqlc-version: '1.9.0'
- run: sqlc version
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
