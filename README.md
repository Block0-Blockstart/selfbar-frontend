# **SelfBar Frontend**

## Installation

```bash
$ npm install
```

## Commands

```bash
# run app in development mode
$ npm run start

# build for prod
$ npm run build

# run linter with autofix
$ npm run lint

# run tests
$ npm run test
```

## Deploy with Docker
This procedure is for deployment on an AWS EC2 instance. The same can be done locally or on any virtual server with Docker installed.

1. **<u>Log on EC2</u>**

Use your favorite SSH tool to access your server instance.


2. **<u>Build a Docker image</u>**


A. **Build the image directly from the Git repo**

```sh
sudo docker build -t selfbar-frontend:latest https://github.com/Block0-Blockstart/selfbar-frontend.git
```

B. **Aternative: copy the repo**

* Clone a fresh copy of the git main branch locally.\
DO NOT npm install, as we don't want any node_modules !           

* Then, upload the whole project directory to the EC2 (FileZilla can do this).

* On the EC2, open a console and navigate to the directory you have just copied. Now, build the image:
```sh
sudo docker build -t selfbar-frontend:latest .
``` 
WARNING: notice the '.' at the end of the command line to instruct Docker to use the Dockerfile in current directory.

3. **<u>Run the image</u>**

```sh
sudo docker run --name selfbar-frontend -it -p 8080:80 --restart=unless-stopped selfbar-frontend:latest
```

4. **<u>AWS: update security group</u>**

If you use an AWS EC2, don't forget to update your security group rules to open the port used by this application (8080 in the example above). Add an inbound rule:

| Type | Protocol | Port range | Source | Description (optional) |
| --- | --- | --- | --- | --- |
| Custom TCP | TCP | 8080 | 0.0.0.0/0, ::/0 | Allows connections to selfbar-frontend


# Contact
**block0**
+ info@block0.io
+ [https://block0.io/](https://block0.io/)

# License
This repository is released under the [MIT License](https://opensource.org/licenses/MIT).


