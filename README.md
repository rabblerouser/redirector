# redirector
A service that redirects URLs and sends events so that we know who's clicking on what.

## Local development
From the `lambda` subdirectory you can do `yarn simulate <some URL>` to invoke the lambda locally with a URL

#### With cage:

```bash
$ cage source mount redirector
$ cage run redirector yarn
$ cage run redirector yarn simulate URL
```
