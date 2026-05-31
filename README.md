
# Make Your First Node.js Container (Docker)

This repo is a tiny Node.js + Express app (a YAML checker/formatter) packaged into a Docker container so you can learn how to build and run your first container.

## What you get

- Deploy your first container
- A HandsOn Practice while learning Docker Containers

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- (Optional) Node.js installed if you want to run without Docker

## Run without Docker (optional)

```bash
npm start  <---- Its important to know how we can start it , cause we are gonna use it while writing our Dockerfile (We will see whats a Dockerfilee just in a bit)
```

## Go through the Code Base
 
 Get famaliar with the Code Base, You should have a basic understanding off the important files, what it does, Is there any specific port the website list on , How you can run it(Without Containerization(in this case npm start))

 ## Dockerfile explained (line by line)  

Open `Dockerfile` and read it top-to-bottom:

1. `FROM node:20-alpine`
   - Start from an official Node.js image.
   - `alpine` is a small Linux distribution, so the image size is smaller.

2. `WORKDIR /app`
   - Creates/uses `/app` inside the container.
   - All next commands run from this folder.

3. `COPY package.json package-lock.json ./`
   - Copies only dependency files first.
   - This improves build caching: dependency install is skipped if these files didn’t change.

4. `RUN npm ci `
   - Installs dependencies from `package-lock.json` (reproducible installs).
   - `--omit=dev` keeps the image smaller by skipping devDependencies.

5. `COPY . .`
   - Copies the rest of your app code into the container.

6. `EXPOSE 3000`
   - Documents that the app listens on port 3000 inside the container.
   - You still need `-p 3000:3000` when running to access it from your computer.
   - So this concept is called port mapping
  [Port Mapping](img\portMapping.png)

7. `CMD ["npm", "start"]`
   - The default command when the container starts.
   - In this project, `npm start` runs `node server.js`.

## Build your first image

From the project folder:

```bash
docker build -t fixmyyaml .
```

What this does:

- Reads the `Dockerfile`
- Downloads the base Node image (first time only)
- Installs dependencies
- Creates a reusable Docker image called `fixmyyaml`

## Run your first container

```bash
docker run --name fixmyyaml -p 3000:3000 fixmyyaml
```

Explanation:

- `--name fixmyyaml` gives the container a friendly name (Your Friendly Neighborhood Spider-Man lol)
- `-p 3000:3000` maps **your computer’s** port 3000 → **container’s** port 3000
- `fixmyyaml` is the image name you built earlier

Now open:

- http://localhost:3000

To stop the container (Ctrl+C in the same terminal) or, if running in the background, use:

```bash
docker stop fixmyyaml
```

To remove the stopped container (so you can re-run with the same name):

```bash
docker rm fixmyyaml
```




>>>>>>> parent of 5f11e65 (images)
