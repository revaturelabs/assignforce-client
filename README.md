# assignforce-client

Angular client for Assignforce

## Production Server

Since Auth0 is the authentication provider, the dev server needs to be started with ssl. You also need to set the production environment to the prod environment

```bash
ng serve --ssl --environment=prod
```

You can also run the following command to achieve the same thing.

```bash
npm run dev:prod
```

## Allow Insecure in Chrome

In order to get chrome to play nicely with SSL, navigate to `chrome://flags/#allow-insecure-localhost` in the address bar. Then, set `Allow invalid certificates for resources loaded from localhost` to `enabled`.

You will need to relaunch Chrome changing this setting.

## Allow Database connection

Since we're currently running our database on a self-signed certified ec2, you will need to proceed through an insecure site to make the connection. Navigate to one of the service endpoints and proceed through security there. A url can be found in the network calls, or you can just go here: `https://18.191.174.118:8765/trainer-service`

Once we have an official signed certificate for the database, this shouldn't be an issue.

## Syncing of Upstream forks

1805May21Java batch hasn't been using this, but this could be useful.

Makes it a little bit easier to sync a forked repository with its upstream counterpart.

> This tool is compatible with Linux, MacOS, and Windows Subsystem Linux only.

1.  Change to `clientApp` directory

```bash
cd clientApp
```

2.  To view all commands

```bash
sh fsync
```

You should see the following:

```bash
sh fsync init    --> initialize upstream and sync
sh fsync sync    --> sync with upstream
sh fsync merge   --> sync with upstream, push and merge with current branch (use with caution)
```

3.  `fsync init`

Use this option when this is your first time syncing your fork with the parent repository.

```bash
sh fsync init
```

4.  `fsync sync`

Use this option each time aftwards.

```bash
sh fsync sync
```

This option will _not_ push the new changes to GitHub... Use option 5 for that.

5.  `fsync merge`

If you're feeling confident, this command will fetch from upstream, commit to the forked repository, switch to the branch you were working on, and merge staging into your branch. (use carefully)

```bash
sh fsync merge
```

> The `sync` and `merge` commands will stash any uncommitted files, and then unstash them when it completes its task.

edited -- August 2, 2018
