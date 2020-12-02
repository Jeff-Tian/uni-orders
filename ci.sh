nvm use 12.16.2

npm test

npm run start:dev-env
echo "dev env started..."
echo "starting e2e tests..."
npm run test:e2e
echo "e2e tests done"

sh .travis/ci.sh

echo "stopping dev env..."
npm run stop:dev-env
echo "dev env stopped."
