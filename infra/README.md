# Infrastructure
This directory contains everything related to our infrastructure. We use [Terraform](https://terraform.io) to manage our infra in a modular, concise, and reusable fashion and Github Actions to automatically deploy infrastructure.

## Getting Started

### Configure AWS
In order to run Terraform commands, users need to provide a set of valid credentials to Terraform.
1. Install `aws-cli`.
2. Create a named profile for the `aws-cli`. This is described more in depth in the [Amazon docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html), however to summarize, you will need an AWS account, an access key id, and a secret access key.
3. This new profile should be named `wic-mt`

### Install Terraform
This project uses the version manager [tfenv](https://formulae.brew.sh/formula/tfenv) to install a specific version of Terraform.

To install using [Homebrew](https://brew.sh/):

```
$ brew install tfenv
```

Next, install the appropriate version

```
$ tfenv install 1.2.0
```

## Directory Structure
[@TODO]

## Runbook
To view pending changes to infrastructure:

```
$ terraform init
$ terraform plan
```

To apply changes to infrastructure:

```
$ terraform apply
```