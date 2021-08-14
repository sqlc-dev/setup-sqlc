# equinox-io/setup-release-tool

This action downloads and installs the [Equinox release tool](https://equinox.io/docs#release-tool).

# Usage

See [action.yml](action.yml)

Install the latest release:
```yaml
steps:
- uses: equinox-io/setup-release-tool@v1
- run: equinox version
```

Install the latest release from the `beta` channel
```yaml
steps:
- uses: equinox-io/setup-release-tool@v1
  with:
    channel: beta
- run: equinox version
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
